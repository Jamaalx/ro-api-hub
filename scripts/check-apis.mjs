#!/usr/bin/env node
// Live link check for every service file in src/content/docs/apis/**.
//
// What it checks (unauthenticated GET/HEAD only, never sends data):
//   - `official_docs`  -> HEAD (falls back to GET) with a 10 s timeout.
//                        2xx/3xx = ok, 401/403/418/429 = blocked (bot wall / login, needs a human),
//                        404/410 = dead, other 4xx/5xx = error, DNS/connection failure = dead.
//   - `api_base_url`   -> only when `auth: none`: any HTTP answer counts as "reachable"
//                        (API roots often answer 404/405 — that still proves the host is alive).
//                        For keyed APIs the base URL is NOT requested; only its hostname is
//                        resolved via DNS, so we never probe endpoints that need credentials.
// Network failures and timeouts are retried once, at the end of the run (>= 30 s later);
// only a second failure counts.
//
// Politeness: max 4 requests in flight, max 1 request/second per host,
// User-Agent "ro-api-hub-checker (+https://github.com/Jamaalx/ro-api-hub)".
//
// Usage:
//   node scripts/check-apis.mjs [--write] [--report <file.md>] [--json <file.json>] [--date YYYY-MM-DD] [--only slug,slug]
//   --write   update frontmatter: `links_checked_at` for fully-ok services; dead links get a
//             "Known issues" note; if a host is gone (DNS/connection/timeout twice) an
//             `active` service becomes `stale`. A 404 on one page only adds the note.
// Exit code: 0 = no dead links, 1 = at least one dead link, 2 = script error.
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { lookup } from 'node:dns/promises';
import https from 'node:https';
import http from 'node:http';
import { listServices, firstUrl } from './lib/services.mjs';

const UA = 'ro-api-hub-checker (+https://github.com/Jamaalx/ro-api-hub)';
const TIMEOUT_MS = 10_000;
const CONCURRENCY = 4;
const PER_HOST_INTERVAL_MS = 1_000;
const RETRY_DELAY_MS = 30_000;

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const WRITE = flag('--write');
const REPORT = opt('--report');
const JSON_OUT = opt('--json');
const DATE = opt('--date') || new Date().toISOString().slice(0, 10);
const ONLY = opt('--only')?.split(',');

// ---------- polite scheduling ----------
const hostNext = new Map();
let inFlight = 0;
const waiters = [];
async function acquire(host) {
  while (inFlight >= CONCURRENCY) await new Promise((r) => waiters.push(r));
  inFlight++;
  // Reserve the next free slot for this host synchronously, then wait for it.
  const now = Date.now();
  const at = Math.max(now, hostNext.get(host) ?? 0);
  hostNext.set(host, at + PER_HOST_INTERVAL_MS);
  if (at > now) await new Promise((r) => setTimeout(r, at - now));
}
function release() { inFlight--; waiters.shift()?.(); }
async function politely(host, fn) {
  await acquire(host);
  try { return await fn(); } finally { release(); }
}

// ---------- HTTP ----------
const CERT_CODES = new Set([
  'UNABLE_TO_VERIFY_LEAF_SIGNATURE', 'UNABLE_TO_GET_ISSUER_CERT_LOCALLY', 'SELF_SIGNED_CERT_IN_CHAIN',
  'DEPTH_ZERO_SELF_SIGNED_CERT', 'CERT_HAS_EXPIRED', 'ERR_TLS_CERT_ALTNAME_INVALID', 'CERT_UNTRUSTED',
]);
const errCode = (e) => (e?.name === 'TimeoutError' || e?.name === 'AbortError' || e?.cause?.name === 'TimeoutError' || e?.code === 'TIMEOUT')
  ? 'TIMEOUT' : String(e?.cause?.code || e?.code || e?.cause?.message || e?.message || 'ERROR');

async function fetchOnce(url, method) {
  const res = await fetch(url, {
    method, redirect: 'follow', signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { 'user-agent': UA, accept: 'text/html,application/json,application/xml;q=0.9,*/*;q=0.8' },
  });
  // Never download bodies: we only need the status line.
  try { await res.body?.cancel(); } catch {}
  return { status: res.status, finalUrl: res.url };
}

// Fallback for servers with an incomplete certificate chain (common on .gov.ro): browsers
// repair the chain via AIA, Node does not. We only read the status line and report it as a warning.
function insecureStatus(url, depth = 0) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https:') ? https : http;
    const req = mod.request(url, { method: 'GET', rejectUnauthorized: false, headers: { 'user-agent': UA }, timeout: TIMEOUT_MS }, (res) => {
      res.destroy();
      const loc = res.headers.location;
      if (res.statusCode >= 300 && res.statusCode < 400 && loc && depth < 5) {
        resolve(insecureStatus(new URL(loc, url).href, depth + 1));
      } else resolve({ status: res.statusCode, finalUrl: url });
    });
    req.on('timeout', () => req.destroy(Object.assign(new Error('timeout'), { code: 'TIMEOUT' })));
    req.on('error', reject);
    req.end();
  });
}

async function probe(url) {
  const host = new URL(url).host;
  try {
    // Many servers mishandle HEAD (error status or a dropped socket); confirm with GET.
    let r;
    try { r = await politely(host, () => fetchOnce(url, 'HEAD')); }
    catch (e) { if (['ENOTFOUND', 'TIMEOUT'].includes(errCode(e))) throw e; }
    if (!r || r.status >= 400) r = await politely(host, () => fetchOnce(url, 'GET'));
    return { ...r, redirected: Boolean(r.finalUrl && r.finalUrl !== url) };
  } catch (e) {
    const code = errCode(e);
    if (CERT_CODES.has(code)) {
      try {
        const r = await politely(host, () => insecureStatus(url));
        return { ...r, tls: code };
      } catch (e2) { return { error: errCode(e2), tls: code }; }
    }
    return { error: code };
  }
}

function classifyDocs(r) {
  if (r.error) return r.error === 'TIMEOUT' ? 'timeout' : 'dead';
  if (r.status < 400) return 'ok';
  if ([401, 403, 418, 429].includes(r.status)) return 'blocked';
  if ([404, 410].includes(r.status)) return 'dead';
  return 'error';
}
const classifyBase = (r) => (r.error ? (r.error === 'TIMEOUT' ? 'timeout' : 'dead') : 'ok');
const describe = (r) => r.error
  ? `${r.error}${r.tls ? ` (after ${r.tls})` : ''}`
  : r.dns ? 'DNS resolves' : `HTTP ${r.status}${r.tls ? ` (cert: ${r.tls})` : ''}${r.finalUrl && r.redirected ? ` -> ${r.finalUrl}` : ''}`;

async function dnsCheck(url) {
  try { await lookup(new URL(url).hostname); return { dns: true }; }
  catch (e) { return { error: e.code || 'DNS' }; }
}

// ---------- plan ----------
const services = listServices().filter((s) => !ONLY || ONLY.includes(s.slug));
const checks = [];
for (const s of services) {
  const docs = firstUrl(s.data.official_docs);
  const base = firstUrl(s.data.api_base_url);
  if (docs) checks.push({ s, field: 'official_docs', url: docs, kind: 'docs' });
  if (base && base !== docs) {
    const open = String(s.data.auth || '').trim() === 'none';
    checks.push({ s, field: 'api_base_url', url: base, kind: open ? 'base' : 'base-dns' });
  }
}

async function run(c) {
  if (c.kind === 'base-dns') { c.r = await dnsCheck(c.url); c.result = c.r.error ? 'dead' : 'ok'; return; }
  c.r = await probe(c.url);
  c.result = c.kind === 'docs' ? classifyDocs(c.r) : classifyBase(c.r);
}

const t0 = Date.now();
console.error(`Checking ${checks.length} URLs from ${services.length} services (concurrency ${CONCURRENCY}, 1 req/s/host)…`);
await Promise.all(checks.map(run));
const retry = checks.filter((c) => c.result === 'dead' && c.r.error || c.result === 'timeout');
if (retry.length) {
  console.error(`Retrying ${retry.length} network failures in ${RETRY_DELAY_MS / 1000}s…`);
  await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
  for (const c of retry) c.first = c.r;
  await Promise.all(retry.map(run));
}
console.error(`Done in ${Math.round((Date.now() - t0) / 1000)}s.`);

// ---------- per-service verdict ----------
const bySlug = new Map(services.map((s) => [s.slug, { s, checks: [] }]));
for (const c of checks) bySlug.get(c.s.slug).checks.push(c);
const rows = [...bySlug.values()].map(({ s, checks }) => {
  const results = checks.map((c) => c.result);
  let verdict = 'ok';
  if (!checks.length) verdict = 'no-url';
  else if (results.includes('dead')) verdict = 'dead';
  else if (results.includes('timeout')) verdict = 'timeout';
  else if (results.some((r) => r !== 'ok')) verdict = 'warn';
  return { s, checks, verdict };
});

// ---------- write frontmatter ----------
function setField(text, key, value, afterKey) {
  const end = text.indexOf('\n---', 4);
  let fm = text.slice(0, end);
  const rest = text.slice(end);
  const re = new RegExp(`^${key}:.*$`, 'm');
  if (re.test(fm)) fm = fm.replace(re, `${key}: ${value}`);
  else {
    const after = new RegExp(`^${afterKey}:.*$`, 'm');
    fm = after.test(fm) ? fm.replace(after, (m) => `${m}\n${key}: ${value}`) : `${fm}\n${key}: ${value}`;
  }
  return fm + rest;
}
function addKnownIssue(text, note) {
  if (text.includes(note)) return text;
  const h = text.match(/^## Known issues[^\n]*\n\n?/m);
  if (!h) return `${text.trimEnd()}\n\n## Known issues / gotchas\n\n${note}\n`;
  const i = h.index + h[0].length;
  return text.slice(0, i) + note + '\n' + text.slice(i);
}

if (WRITE) {
  for (const row of rows) {
    const { s } = row;
    let text = readFileSync(s.file, 'utf8');
    if (row.verdict === 'ok') text = setField(text, 'links_checked_at', DATE, 'verified_at');
    if (row.verdict === 'dead' || row.verdict === 'timeout') {
      for (const c of row.checks.filter((c) => c.result === 'dead' || c.result === 'timeout')) {
        text = addKnownIssue(text, `- **Link check ${DATE}:** \`${c.field}\` ${c.url} → ${describe(c.r)}${c.first ? ` (twice, ≥30 s apart)` : ''}. Needs a human to find the new URL.`);
      }
      // Host gone (DNS / connection / timeout) -> the documented integration path is unusable: stale.
      // A single moved page (404/410) only gets the note — the API itself may be fine.
      const hostGone = row.checks.some((c) => (c.result === 'dead' || c.result === 'timeout') && c.r.error);
      if (hostGone && s.data.status === 'active') text = setField(text, 'status', 'stale', 'country');
    }
    if (text !== s.text) writeFileSync(s.file, text);
  }
}

// ---------- report ----------
const count = (v) => rows.filter((r) => r.verdict === v).length;
const esc = (x) => String(x).replace(/\|/g, '\\|');
const lines = [
  `# Link check — ${DATE}`,
  '',
  `Generated by \`node scripts/check-apis.mjs\`. ${services.length} services, ${checks.length} URLs.`,
  '',
  'Rules: `official_docs` gets HEAD→GET (10 s timeout); `api_base_url` is requested only for `auth: none` services',
  '(any HTTP status = reachable), otherwise only its hostname is resolved. Network failures are retried once ≥30 s later.',
  'This checks that links resolve — it does **not** test the APIs themselves (that is what `verified_at` records).',
  '',
  '| Verdict | Services |',
  '|---|---|',
  `| ok — all URLs answer | ${count('ok')} |`,
  `| warn — blocked (401/403/418/429) or 5xx/other 4xx, needs a manual look | ${count('warn')} |`,
  `| timeout — no answer twice | ${count('timeout')} |`,
  `| dead — 404/410, DNS or connection failure | ${count('dead')} |`,
  `| no URL declared | ${count('no-url')} |`,
  '',
];
for (const v of ['dead', 'timeout', 'warn']) {
  const list = rows.filter((r) => r.verdict === v);
  if (!list.length) continue;
  lines.push(`## ${v}`, '', '| Service | Field | URL | Result |', '|---|---|---|---|');
  for (const r of list) for (const c of r.checks.filter((c) => c.result !== 'ok')) {
    lines.push(`| [${r.s.slug}](../${r.s.relFile}) | ${c.field} | ${esc(c.url)} | ${esc(describe(c.r))} |`);
  }
  lines.push('');
}
lines.push('## All checks', '', '| Service | Status | Field | URL | Result | Verdict |', '|---|---|---|---|---|---|');
for (const r of rows) for (const c of r.checks) {
  lines.push(`| ${r.s.slug} | ${r.s.data.status ?? ''} | ${c.field}${c.kind === 'base-dns' ? ' (DNS only)' : ''} | ${esc(c.url)} | ${esc(describe(c.r))} | ${c.result} |`);
}
const md = lines.join('\n') + '\n';
if (REPORT) { mkdirSync(dirname(REPORT), { recursive: true }); writeFileSync(REPORT, md); console.error(`Report: ${REPORT}`); }
if (JSON_OUT) {
  writeFileSync(JSON_OUT, JSON.stringify(rows.map((r) => ({
    slug: r.s.slug, file: r.s.relFile, verdict: r.verdict,
    checks: r.checks.map((c) => ({ field: c.field, url: c.url, result: c.result, detail: describe(c.r) })),
  })), null, 2));
}
console.log(`ok ${count('ok')} · warn ${count('warn')} · timeout ${count('timeout')} · dead ${count('dead')} · no-url ${count('no-url')}`);
for (const r of rows.filter((r) => r.verdict === 'dead' || r.verdict === 'timeout')) {
  console.log(`${r.verdict.toUpperCase()} ${r.s.slug}: ${r.checks.filter((c) => c.result !== 'ok').map((c) => `${c.url} (${describe(c.r)})`).join('; ')}`);
}
process.exitCode = rows.some((r) => r.verdict === 'dead' || r.verdict === 'timeout') ? 1 : 0;
