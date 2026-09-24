---
slug: nexus-erp
title: Nexus ERP Web API
category: invoicing
institution: Nexus Media SRL
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: api_key
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: true
pricing: enterprise
rate_limit: unknown
official_docs: https://www.docs.nexuserp.ro/articol/web-api-nexus-erp/360
api_base_url: per-tenant (configured in Nexus admin)
last_known_version: unknown
mandatory_for_business: false
---

# Nexus ERP Web API

## Overview

Nexus ERP is a Romanian on-premise/private-cloud ERP with strong adoption among HoReCa, retail and distribution. The Web API is a REST surface activated per "application" (`per-app key`) inside Nexus admin. It exposes 1300+ endpoints across `nomenclator/*`, `vanzari/*`, `cumparari/*`, `stoc/*`, `casa_banca/*`, `contabilitate/*` and many more. Each customer has their own base URL (server hostname / port).

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `/api/login` | Obtain session token |
| GET | `/api/nomenclator/parteneri` | Read partners |
| GET | `/api/nomenclator/articole` | Read articles / products |
| GET | `/api/stoc/situatie` | Stock status |
| POST | `/api/vanzari/factura` | Create sales invoice |
| GET | `/api/contabilitate/balanta` | Trial balance |

## Authentication

Per-app key + username/password (or token) issued in Nexus admin under "Aplicații API". Base URL is tenant-specific. Different societate (legal entity) may need separate keys.

## Request example

```bash
curl -X POST 'https://<tenant>.nexuserp.ro/api/login' \
  -H 'Content-Type: application/json' \
  -d '{"appKey":"...","user":"...","password":"..."}'
```

## Response example

```json
{ "token": "...", "societate": "ABC", "expires": "..." }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Node | internal ZED-ZEN wrapper | active | Used in SoupArt / Nexus Dashboard |
| TS | none public | — | Build per docs |

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available — use dev societate
- [x] Local simulator: Nexus dev environment per tenant

## Known issues / gotchas

- Base URL differs per tenant — no global host.
- Prod vs local keys are DIFFERENT (different societate); easy to mix up.
- Endpoint shapes vary slightly per Nexus version; check `/api/version`.
- Some `nomenclator/*` reads are paginated with `?from=...&to=...`.
- Token TTL is short — refresh logic mandatory.

## Tutorial seeds (for content pipeline)

- "Reading Nexus partner balances for a B2B dashboard"
- "Syncing Nexus stock to a Next.js shop (SoupArt pattern)"
- "Multi-societate auth helper for Nexus ERP"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (per-tenant generated)
- [ ] Thin REST wrapper with multi-tenant config
- [ ] MCP tool exposed via FastMCP (per-tenant)
- [ ] Code samples (Node/Python)

## References

- Official docs: https://www.docs.nexuserp.ro/articol/web-api-nexus-erp/360
- Public site: https://www.nexuserp.ro/
- Last manual verification: 2026-05-27
