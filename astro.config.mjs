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
        { icon: 'github', label: 'GitHub', href: 'https://github.com/zed-zen/ro-api-hub' },
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
        { label: 'PUBLIC — Fiscal', autogenerate: { directory: 'apis/public/fiscal' }, collapsed: true },
        { label: 'PUBLIC — Finance', autogenerate: { directory: 'apis/public/finance' }, collapsed: true },
        { label: 'PUBLIC — Registry', autogenerate: { directory: 'apis/public/registry' }, collapsed: true },
        { label: 'PUBLIC — Statistics', autogenerate: { directory: 'apis/public/stats' }, collapsed: true },
        { label: 'PUBLIC — Geo / Meteo', autogenerate: { directory: 'apis/public/geo' }, collapsed: true },
        { label: 'PUBLIC — Health', autogenerate: { directory: 'apis/public/health' }, collapsed: true },
        { label: 'PUBLIC — Transport', autogenerate: { directory: 'apis/public/transport' }, collapsed: true },
        { label: 'PUBLIC — Justice', autogenerate: { directory: 'apis/public/justice' }, collapsed: true },
        { label: 'PUBLIC — Identity', autogenerate: { directory: 'apis/public/identity' }, collapsed: true },
        { label: 'PUBLIC — Gov', autogenerate: { directory: 'apis/public/gov' }, collapsed: true },
        { label: 'PUBLIC — Open Data', autogenerate: { directory: 'apis/public/opendata' }, collapsed: true },
        { label: 'PUBLIC — Procurement', autogenerate: { directory: 'apis/public/procurement' }, collapsed: true },
        { label: 'PUBLIC — Elections', autogenerate: { directory: 'apis/public/elections' }, collapsed: true },
        { label: 'PUBLIC — Regulators / Civic', autogenerate: { directory: 'apis/public/regulators' }, collapsed: true },
        { label: 'PRIVATE — Banks PSD2', autogenerate: { directory: 'apis/private/banks' }, collapsed: true },
        { label: 'PRIVATE — Payments', autogenerate: { directory: 'apis/private/payments' }, collapsed: true },
        { label: 'PRIVATE — Couriers', autogenerate: { directory: 'apis/private/couriers' }, collapsed: true },
        { label: 'PRIVATE — Telecom', autogenerate: { directory: 'apis/private/telecom' }, collapsed: true },
        { label: 'PRIVATE — Marketplaces', autogenerate: { directory: 'apis/private/marketplaces' }, collapsed: true },
        { label: 'PRIVATE — SMS', autogenerate: { directory: 'apis/private/sms' }, collapsed: true },
        { label: 'PRIVATE — Invoicing', autogenerate: { directory: 'apis/private/invoicing' }, collapsed: true },
        { label: 'PRIVATE — Maps', autogenerate: { directory: 'apis/private/maps' }, collapsed: true },
        { label: 'PRIVATE — Jobs', autogenerate: { directory: 'apis/private/jobs' }, collapsed: true },
        { label: 'PRIVATE — Energy', autogenerate: { directory: 'apis/private/energy' }, collapsed: true },
        { label: 'PRIVATE — Insurance', autogenerate: { directory: 'apis/private/insurance' }, collapsed: true },
        { label: 'Aggregators', autogenerate: { directory: 'apis/aggregators' }, collapsed: true },
        { label: 'Community / OSS SDKs', autogenerate: { directory: 'apis/community' }, collapsed: true },
      ],
    }),
  ],
});
