#!/usr/bin/env node
// Checks every internal link (href/src) in the built site (dist/) resolves to a file.
// Honours the `base` path from site.config.mjs: with base /ro-api-hub, a link to
// "/apis/" (missing the base) is reported as broken, because it would 404 on the host.
// Usage: node scripts/check-dist-links.mjs   (run after `npm run build`)
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { ROOT } from './lib/services.mjs';
import { BASE_PATH, SITE_URL } from '../site.config.mjs';

const DIST = join(ROOT, 'dist');
const htmlFiles = readdirSync(DIST, { recursive: true }).filter((f) => f.endsWith('.html')).map((f) => join(DIST, f));

function resolveTarget(pathname) {
  let p = decodeURIComponent(pathname);
  if (BASE_PATH) {
    if (p !== BASE_PATH && !p.startsWith(BASE_PATH + '/')) return null; // escapes the base -> broken
    p = p.slice(BASE_PATH.length) || '/';
  }
  const f = join(DIST, p);
  if (existsSync(f) && statSync(f).isFile()) return f;
  if (existsSync(join(f, 'index.html'))) return f;
  if (existsSync(f.replace(/\/$/, '') + '.html')) return f;
  return null;
}

const broken = [];
let checked = 0;
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  // Re-anchor on the base so relative links resolve like on the real host.
  const pagePath = (BASE_PATH || '') + '/' + relative(DIST, dirname(file)).replace(/\\/g, '/') + '/';
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const raw = m[1].replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|tel:|data:|javascript:|#|\/\/)/.test(raw)) {
      if (!raw.startsWith(SITE_URL + '/')) continue; // external, not ours
    }
    const u = new URL(raw.startsWith(SITE_URL) ? raw.slice(new URL(SITE_URL).origin.length) : raw, 'http://x' + pagePath.replace(/\/+/g, '/'));
    checked++;
    if (!resolveTarget(u.pathname)) broken.push(`${relative(DIST, file)} -> ${raw}`);
  }
}
console.log(`${htmlFiles.length} pages, ${checked} internal links, ${broken.length} broken (base: ${BASE_PATH || '/'})`);
for (const b of [...new Set(broken)].slice(0, 50)) console.log('  ' + b);
process.exitCode = broken.length ? 1 : 0;
