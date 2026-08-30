# ro-api-hub

[![Build](https://github.com/Jamaalx/ro-api-hub/actions/workflows/build.yml/badge.svg)](https://github.com/Jamaalx/ro-api-hub/actions/workflows/build.yml)

The comprehensive open-source library of Romanian APIs — keys, sandbox credentials, OpenAPI specs, SDKs, tutorials and MCP wrappers, in one place.

> **Built like:** BrasilAPI + RapidAPI + Mintlify — but for Romania.

## Status

**Phase 1 — Catalogue (complete)**: 124 services across 27 categories, all with structured YAML frontmatter parsable by AI agents.

**Phase 2 — Implementation (in progress)**: canonical OpenAPI 3.1 specs, REST facades (BrasilAPI-style) for scrape-only services, hosted MCP server, multi-language SDKs and tutorials.

## Quick start (local development)

Requires Node 22.12+ (Astro 7).

```bash
npm install
npm run dev   # → http://localhost:4321
```

## What's included

Counts from the `status:` frontmatter of the 124 service files (verified 2026-08-30):

- ✅ **91 active** APIs
- 🔒 9 gated (contract / cert / WAF) — with access instructions
- ⚠️ 10 stale — flagged with alternatives
- ❌ 13 with no public API — scraping patterns documented as fallback
- 🚨 1 suspended (RAR Auto Pass) — plus other incidents (e.g. ASF URL broken) noted per service

## Categories (27)

**Public sector**: Fiscal (ANAF) · Finance (BNR, ASF, BVB) · Registry (ONRC) · Statistics (INS) · Geo (ANCPI, ANM, ANAR) · Health (CNAS) · Transport (CNAIR, RAR, DRPCIV, CFR, ARR) · Justice (Portal Just, Monitorul Oficial) · Identity (ROeID, STS) · Gov (Ghișeul, e-Guvernare) · OpenData (data.gov.ro) · Procurement (SEAP) · Elections (AEP) · Regulators / civic.

**Private sector**: Banks PSD2 (10) · Payments (NETOPIA, EuPlatesc, Stripe RO, etc.) · Couriers (Sameday, FAN, Cargus, DPD, GLS, Innoship) · Telecom (Orange CAMARA) · Marketplaces (eMAG, OLX/Storia) · SMS · Invoicing SaaS (SmartBill, Oblio, Nexus ERP) · Maps · Jobs · Energy · Insurance.

**Aggregators & community**: openapi.ro · listafirme.eu · incorpo.ro MCP · demoanaf.ro · all major OSS RO API SDKs.

## For AI agents

Every page is also served as `/llms.txt` and `/llms-full.txt`. Category-specific bundles too:

- `/_llms-txt/fiscal.txt`, `/_llms-txt/finance.txt`, `/_llms-txt/banks-psd2.txt`, `/_llms-txt/couriers.txt`, `/_llms-txt/all-public.txt`, `/_llms-txt/all-private.txt` (all listed in `/llms.txt`)

MCP server at `/mcp` — coming in phase 2.

See [`AGENTS.md`](./AGENTS.md) for contribution rules optimised for AI assistants.

## Contributing

Read [`AGENTS.md`](./AGENTS.md) + `src/content/docs/contributing.md`. To add a service:

1. Check it doesn't already exist: `grep -ri "<slug>" src/content/docs/apis/`
2. Copy [`templates/api-service.md`](./templates/api-service.md) to `src/content/docs/apis/{public|private}/{category}/{slug}.md` (or `apis/aggregators/`, `apis/community/`)
3. Fill in **all** frontmatter fields — the schema in `src/content.config.ts` validates them at build time; `unknown` is allowed, guessing is not
4. Write the body sections in order: Overview · Endpoints · Authentication · Request example · Response example · Existing SDKs · Testing approach · Known issues / gotchas · Tutorial seeds · ro-api-hub integration plan · References
5. Set `verified_at:` to the date you actually tested the API
6. `npm run build` must pass, then open a PR titled `add: {service name}` (or `fix: {service} — {what}` for corrections)

Never fabricate endpoint URLs, version numbers or behaviour. No marketing copy.

## License

- **Code** (Astro site, scripts, config): [MIT](./LICENSE) — © 2026 Alex Mantello (ZED-ZEN)
- **Catalogue content** (the per-service descriptions in `src/content/docs/`): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — attribute to "ro-api-hub" with a link to this repo

## Acknowledgements

Inspired by BrasilAPI, api.gouv.fr, APIs.guru, the llms.txt spec, the Model Context Protocol, and the Romanian developer community (Code for Romania, peviitor-ro, the ANAF API community, and everyone who wrote a thin ANAF/BNR wrapper over the years).
