#!/usr/bin/env node
// Generates catalog.json from the frontmatter of every service file.
// Two copies:
//   - catalog.json          repo root, committed -> usable from raw.githubusercontent.com with no site.
//                           `page_url` is null there (the static site is not published yet).
//   - public/catalog.json   served by the static site at /catalog.json, with `page_url` built from
//                           SITE_URL (site.config.mjs). Git-ignored, regenerated before every build/dev.
// Usage:
//   node scripts/build-catalog.mjs                both copies (`npm run catalog`, then commit catalog.json)
//   node scripts/build-catalog.mjs --public-only  only public/catalog.json (prebuild / predev)
//   node scripts/build-catalog.mjs --check        exit 1 if the committed catalog.json is stale (CI)
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { listServices, firstUrl, ROOT } from './lib/services.mjs';
import { SITE_URL, REPO_BLOB } from '../site.config.mjs';

const SCHEMA_URL = 'https://raw.githubusercontent.com/Jamaalx/ro-api-hub/main/public/catalog.schema.json';
const orNull = (v) => (v === undefined || v === '' ? null : v);

const build = (withPages) => listServices().map((s) => {
  const d = s.data;
  return {
    slug: s.slug,
    name: d.title ?? s.slug,
    category: orNull(d.category),
    sector: s.sector, // public | private | aggregators | community
    institution: orNull(d.institution),
    status: orNull(d.status),
    auth: orNull(d.auth),
    protocol: orNull(d.protocol),
    sandbox_available: typeof d.sandbox_available === 'boolean' ? d.sandbox_available : null,
    contract_required: typeof d.contract_required === 'boolean' ? d.contract_required : null,
    openapi_spec: d.openapi_spec === 'partial' ? 'partial' : typeof d.openapi_spec === 'boolean' ? d.openapi_spec : null,
    pricing: orNull(d.pricing),
    official_docs: firstUrl(d.official_docs),
    api_base_url: firstUrl(d.api_base_url),
    api_base_url_note: firstUrl(d.api_base_url) ? null : orNull(d.api_base_url),
    verified_at: orNull(d.verified_at),
    links_checked_at: orNull(d.links_checked_at),
    source_url: `${REPO_BLOB}/${s.relFile}`,
    page_url: withPages ? `${SITE_URL}/${s.slug}/` : null,
  };
}).sort((a, b) => a.slug.localeCompare(b.slug));

const render = (withPages) => {
  const services = build(withPages);
  return JSON.stringify({
    $schema: SCHEMA_URL,
    name: 'ro-api-hub',
    description: 'Catalogue of Romanian public- and private-sector APIs. Generated from the frontmatter of src/content/docs/apis/**.',
    license: 'CC-BY-4.0',
    source: 'https://github.com/Jamaalx/ro-api-hub',
    site_url: withPages ? SITE_URL : null,
    count: services.length,
    services,
  }, null, 2) + '\n';
};

const rootFile = join(ROOT, 'catalog.json');
const args = process.argv.slice(2);
if (args.includes('--check')) {
  const current = existsSync(rootFile) ? readFileSync(rootFile, 'utf8') : '';
  if (current !== render(false)) {
    console.error('catalog.json is out of date — run `npm run catalog` and commit it.');
    process.exit(1);
  }
  console.log('catalog.json is up to date.');
} else {
  if (!args.includes('--public-only')) writeFileSync(rootFile, render(false));
  const pub = render(true);
  writeFileSync(join(ROOT, 'public/catalog.json'), pub);
  console.log(`catalog.json: ${JSON.parse(pub).count} services${args.includes('--public-only') ? ' (public/ only)' : ''}; site ${SITE_URL}`);
}
