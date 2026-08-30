# ro-api-hub

[![Build](https://github.com/Jamaalx/ro-api-hub/actions/workflows/build.yml/badge.svg)](https://github.com/Jamaalx/ro-api-hub/actions/workflows/build.yml)

The comprehensive open-source library of Romanian APIs — keys, sandbox credentials, OpenAPI specs, SDKs, tutorials and MCP wrappers, in one place.

> **Built like:** BrasilAPI + RapidAPI + Mintlify — but for Romania.

## Status

**Phase 1 — Catalogue (complete)**: 124 services across 27 categories, all with structured YAML frontmatter parsable by AI agents.

**Phase 2 — Implementation (in progress)**: canonical OpenAPI 3.1 specs, REST facades (BrasilAPI-style) for scrape-only services, hosted MCP server, multi-language SDKs and tutorials.

## Quick start (local development)

```bash
npm install
npm run dev   # → http://localhost:4321
```

## What's included

- ✅ **67 active APIs** verified recent
- 🔒 18 gated (contract / cert / WAF) — with access instructions
- ⚠️ 18 stale — flagged with alternatives
- ❌ 14 with no public API — scraping patterns documented as fallback
- 🚨 3 critical incidents (RAR Auto Pass suspended, ASF URL broken, etc.)

## Categories (27)

**Public sector**: Fiscal (ANAF) · Finance (BNR, ASF, BVB) · Registry (ONRC) · Statistics (INS) · Geo (ANCPI, ANM, ANAR) · Health (CNAS) · Transport (CNAIR, RAR, DRPCIV, CFR, ARR) · Justice (Portal Just, Monitorul Oficial) · Identity (ROeID, STS) · Gov (Ghișeul, e-Guvernare) · OpenData (data.gov.ro) · Procurement (SEAP) · Elections (AEP) · Regulators / civic.

**Private sector**: Banks PSD2 (10) · Payments (NETOPIA, EuPlatesc, Stripe RO, etc.) · Couriers (Sameday, FAN, Cargus, DPD, GLS, Innoship) · Telecom (Orange CAMARA) · Marketplaces (eMAG, OLX/Storia) · SMS · Invoicing SaaS (SmartBill, Oblio, Nexus ERP) · Maps · Jobs · Energy · Insurance.

**Aggregators & community**: openapi.ro · listafirme.eu · incorpo.ro MCP · demoanaf.ro · all major OSS RO API SDKs.

## For AI agents

Every page is also served as `/llms.txt` and `/llms-full.txt`. Category-specific bundles too:

- `/llms-fiscal.txt`, `/llms-finance.txt`, `/llms-banks-psd2.txt`, `/llms-couriers.txt`, `/llms-public.txt`, `/llms-private.txt`

MCP server at `/mcp` — coming in phase 2.

See [`AGENTS.md`](./AGENTS.md) for contribution rules optimised for AI assistants.

## Contributing

Read [`AGENTS.md`](./AGENTS.md) + `src/content/docs/contributing.md`. TL;DR: copy `templates/api-service.md`, fill the YAML frontmatter, open a PR.

## License

- **Code** (Astro site, scripts, config): [MIT](./LICENSE) — © 2026 Alex Mantello (ZED-ZEN)
- **Catalogue content** (the per-service descriptions in `src/content/docs/`): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — attribute to "ro-api-hub" with a link to this repo

## Acknowledgements

Inspired by BrasilAPI, api.gouv.fr, APIs.guru, the llms.txt spec, the Model Context Protocol, and the Romanian developer community (Code for Romania, peviitor-ro, the ANAF API community, and everyone who wrote a thin ANAF/BNR wrapper over the years).
