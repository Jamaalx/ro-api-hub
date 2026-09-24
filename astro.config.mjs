import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLlmsTxt from 'starlight-llms-txt';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { SITE_ORIGIN, BASE_PATH } from './site.config.mjs';

// Markdown links like `/anaf-vat-v9/` are written root-relative. When the site is
// served under a path (GitHub Pages: /ro-api-hub), prefix them with `base`.
function remarkBaseLinks() {
  const walk = (node) => {
    if ((node.type === 'link' || node.type === 'definition') && /^\/(?!\/)/.test(node.url) && !node.url.startsWith(BASE_PATH + '/')) {
      node.url = BASE_PATH + node.url;
    }
    node.children?.forEach(walk);
  };
  return (tree) => { if (BASE_PATH) walk(tree); };
}

// Every service file sets a flat `slug:` in its frontmatter, so page ids are
// `anaf-vat-v9`, not `apis/public/fiscal/anaf-vat-v9`. starlight-llms-txt matches
// customSets.paths against those ids, so directory globs match nothing — resolve
// each directory to the list of slugs it contains instead.
const DOCS = 'src/content/docs';
function slugsIn(dir) {
  const out = [];
  for (const entry of readdirSync(join(DOCS, dir), { withFileTypes: true, recursive: true })) {
    if (!entry.isFile() || !/\.mdx?$/.test(entry.name)) continue;
    const file = join(entry.parentPath, entry.name);
    const slug = readFileSync(file, 'utf8').match(/^slug:\s*['"]?([^'"\s]+)/m)?.[1];
    out.push(slug ?? relative(DOCS, file).replace(/\.mdx?$/, '').replace(/\/index$/, ''));
  }
  return out.sort();
}

export default defineConfig({
  // Public URL comes from site.config.mjs (SITE_URL env var, with a fallback).
  site: SITE_ORIGIN,
  base: BASE_PATH || undefined,
  markdown: { remarkPlugins: [remarkBaseLinks] },
  integrations: [
    starlight({
      title: 'ro-api-hub',
      description: 'Open-source catalogue of Romanian APIs — endpoints, auth and access steps, sandboxes, examples, existing SDKs and gotchas, one file per service.',
      defaultLocale: 'root',
      locales: {
        root: { label: 'Română', lang: 'ro' },
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/Jamaalx/ro-api-hub' },
      ],
      plugins: [
        starlightLlmsTxt({
          projectName: 'ro-api-hub',
          description: 'Catalogue of Romanian APIs (ANAF, BNR, ONRC, PSD2 banks, couriers, etc.): endpoints, auth flows, access steps, examples, existing third-party SDKs and known issues. Machine-readable index: catalog.json.',
          customSets: [
            { label: 'Fiscal', description: 'ANAF VAT, e-Factura, e-Transport, SAF-T, SPV, e-TVA', paths: slugsIn('apis/public/fiscal') },
            { label: 'Finance', description: 'BNR, ASF, BVB', paths: slugsIn('apis/public/finance') },
            { label: 'Banks PSD2', description: '10 RO bank Open Banking APIs', paths: slugsIn('apis/private/banks') },
            { label: 'Couriers', description: 'Sameday, FAN, Cargus, DPD, GLS, Innoship', paths: slugsIn('apis/private/couriers') },
            { label: 'All public', description: 'All public-sector RO APIs', paths: slugsIn('apis/public') },
            { label: 'All private', description: 'All private-sector RO APIs', paths: slugsIn('apis/private') },
          ],
        }),
      ],
      sidebar: [
        { label: 'Start aici', items: [
          { label: 'Despre proiect', link: '/' },
          { label: 'Catalog complet', link: '/apis/' },
          { label: 'Cum contribui', slug: 'contributing' },
          { label: 'Pentru AI agents', slug: 'ai-agents' },
        ]},
        { label: 'PUBLIC — Fiscal', collapsed: true, items: [{ autogenerate: { directory: 'apis/public/fiscal', collapsed: true } }] },
        { label: 'PUBLIC — Finance', collapsed: true, items: [{ autogenerate: { directory: 'apis/public/finance', collapsed: true } }] },
        { label: 'PUBLIC — Registry', collapsed: true, items: [{ autogenerate: { directory: 'apis/public/registry', collapsed: true } }] },
        { label: 'PUBLIC — Statistics', collapsed: true, items: [{ autogenerate: { directory: 'apis/public/stats', collapsed: true } }] },
        { label: 'PUBLIC — Geo / Meteo', collapsed: true, items: [{ autogenerate: { directory: 'apis/public/geo', collapsed: true } }] },
        { label: 'PUBLIC — Health', collapsed: true, items: [{ autogenerate: { directory: 'apis/public/health', collapsed: true } }] },
        { label: 'PUBLIC — Transport', collapsed: true, items: [{ autogenerate: { directory: 'apis/public/transport', collapsed: true } }] },
        { label: 'PUBLIC — Justice', collapsed: true, items: [{ autogenerate: { directory: 'apis/public/justice', collapsed: true } }] },
        { label: 'PUBLIC — Identity', collapsed: true, items: [{ autogenerate: { directory: 'apis/public/identity', collapsed: true } }] },
        { label: 'PUBLIC — Gov', collapsed: true, items: [{ autogenerate: { directory: 'apis/public/gov', collapsed: true } }] },
        { label: 'PUBLIC — Open Data', collapsed: true, items: [{ autogenerate: { directory: 'apis/public/opendata', collapsed: true } }] },
        { label: 'PUBLIC — Procurement', collapsed: true, items: [{ autogenerate: { directory: 'apis/public/procurement', collapsed: true } }] },
        { label: 'PUBLIC — Elections', collapsed: true, items: [{ autogenerate: { directory: 'apis/public/elections', collapsed: true } }] },
        { label: 'PUBLIC — Regulators / Civic', collapsed: true, items: [{ autogenerate: { directory: 'apis/public/regulators', collapsed: true } }] },
        { label: 'PRIVATE — Banks PSD2', collapsed: true, items: [{ autogenerate: { directory: 'apis/private/banks', collapsed: true } }] },
        { label: 'PRIVATE — Payments', collapsed: true, items: [{ autogenerate: { directory: 'apis/private/payments', collapsed: true } }] },
        { label: 'PRIVATE — Couriers', collapsed: true, items: [{ autogenerate: { directory: 'apis/private/couriers', collapsed: true } }] },
        { label: 'PRIVATE — Telecom', collapsed: true, items: [{ autogenerate: { directory: 'apis/private/telecom', collapsed: true } }] },
        { label: 'PRIVATE — Marketplaces', collapsed: true, items: [{ autogenerate: { directory: 'apis/private/marketplaces', collapsed: true } }] },
        { label: 'PRIVATE — SMS', collapsed: true, items: [{ autogenerate: { directory: 'apis/private/sms', collapsed: true } }] },
        { label: 'PRIVATE — Invoicing', collapsed: true, items: [{ autogenerate: { directory: 'apis/private/invoicing', collapsed: true } }] },
        { label: 'PRIVATE — Maps', collapsed: true, items: [{ autogenerate: { directory: 'apis/private/maps', collapsed: true } }] },
        { label: 'PRIVATE — Jobs', collapsed: true, items: [{ autogenerate: { directory: 'apis/private/jobs', collapsed: true } }] },
        { label: 'PRIVATE — Energy', collapsed: true, items: [{ autogenerate: { directory: 'apis/private/energy', collapsed: true } }] },
        { label: 'PRIVATE — Insurance', collapsed: true, items: [{ autogenerate: { directory: 'apis/private/insurance', collapsed: true } }] },
        { label: 'Aggregators', collapsed: true, items: [{ autogenerate: { directory: 'apis/aggregators', collapsed: true } }] },
        { label: 'Community / OSS SDKs', collapsed: true, items: [{ autogenerate: { directory: 'apis/community', collapsed: true } }] },
      ],
    }),
  ],
});
