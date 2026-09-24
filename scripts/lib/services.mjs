// Reads the per-service catalogue files (src/content/docs/apis/**) without any
// dependency. The frontmatter is flat `key: value` YAML (enforced by the schema
// in src/content.config.ts), so a line parser is enough.
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = fileURLToPath(new URL('../..', import.meta.url));
export const APIS_DIR = join(ROOT, 'src/content/docs/apis');

function scalar(raw) {
  let v = raw.trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
  if (v === 'true') return true;
  if (v === 'false') return false;
  return v;
}

export function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) return null;
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (kv) data[kv[1]] = scalar(kv[2]);
  }
  return { data, raw: m[1], end: m[0].length };
}

/** First http(s) URL in a frontmatter value ("https://x/ (via SDK)" -> "https://x/"), else null. */
export function firstUrl(value) {
  if (typeof value !== 'string') return null;
  const m = value.match(/https?:\/\/[^\s)'"<>]+/);
  if (!m || /[{}]|PORT|YOUR_|<|>/.test(m[0])) return null; // templates, placeholders
  try {
    const u = new URL(m[0]);
    if (/^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(u.hostname) || /(^|\.)example\.(com|org)$/.test(u.hostname)) return null;
    return u.href;
  } catch { return null; }
}

/** All service files, sorted by path. `sector` is public | private | aggregators | community. */
export function listServices() {
  const out = [];
  for (const entry of readdirSync(APIS_DIR, { withFileTypes: true, recursive: true })) {
    if (!entry.isFile() || !/\.mdx?$/.test(entry.name) || /^index\.mdx?$/.test(entry.name)) continue;
    const file = join(entry.parentPath, entry.name);
    const rel = relative(APIS_DIR, file).split(sep);
    const text = readFileSync(file, 'utf8');
    const fm = parseFrontmatter(text);
    if (!fm) throw new Error(`No frontmatter in ${file}`);
    const slug = fm.data.slug || entry.name.replace(/\.mdx?$/, '');
    out.push({ file, relFile: relative(ROOT, file), sector: rel[0], slug, data: fm.data, text });
  }
  return out.sort((a, b) => a.relFile.localeCompare(b.relFile));
}
