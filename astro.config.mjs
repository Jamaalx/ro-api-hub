import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLlmsTxt from 'starlight-llms-txt';

export default defineConfig({
  site: 'https://ro-api-hub.dev',
  integrations: [
    starlight({
      title: 'ro-api-hub',
      description: 'The comprehensive open-source library of Romanian APIs — keys, sandbox credentials, OpenAPI specs, SDKs, tutorials and MCP wrappers in one place.',
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
          description: 'Comprehensive catalogue of Romanian APIs (BNR, ANAF, ONRC, banks, couriers, etc.) with endpoints, auth flows, SDKs, OpenAPI specs and MCP wrappers.',
          customSets: [
            { label: 'Fiscal', description: 'ANAF VAT, e-Factura, e-Transport, SAF-T, SPV, e-TVA', paths: ['apis/public/fiscal/**'] },
            { label: 'Finance', description: 'BNR, ASF, BVB', paths: ['apis/public/finance/**'] },
            { label: 'Banks PSD2', description: '10 RO bank Open Banking APIs', paths: ['apis/private/banks/**'] },
            { label: 'Couriers', description: 'Sameday, FAN, Cargus, DPD, GLS, Innoship', paths: ['apis/private/couriers/**'] },
            { label: 'All public', description: 'All public-sector RO APIs', paths: ['apis/public/**'] },
            { label: 'All private', description: 'All private-sector RO APIs', paths: ['apis/private/**'] },
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
