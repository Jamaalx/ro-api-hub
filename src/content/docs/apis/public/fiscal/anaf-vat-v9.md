---
slug: anaf-vat-v9
title: ANAF VAT/CUI Verification Web Service v9
category: fiscal
institution: ANAF (Agenția Națională de Administrare Fiscală)
country: RO
status: active
verified_at: 2026-05-27
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: "1 req/s, max 100 CUI per request"
official_docs: https://static.anaf.ro/static/10/Anaf/Informatii_R/Servicii_web/doc_WS_V9.txt
api_base_url: https://webservicesp.anaf.ro/PlatitorTvaRest/api/v9/ws/tva
last_known_version: "v9"
mandatory_for_business: false
---

# ANAF VAT/CUI Verification Web Service v9

## Overview

Synchronous public web service published by ANAF that returns fiscal status for a Romanian company by CUI (Cod Unic de Înregistrare) at a given reference date. Returns whether the company is a VAT payer, VAT-on-collection payer, inactive, e-Factura registered, etc. Canonical replacement of v8 since 2025-05-01. Used by virtually every RO invoicing / accounting / KYC integration.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `https://webservicesp.anaf.ro/PlatitorTvaRest/api/v9/ws/tva` | Lookup up to 100 CUI for a given date |

## Authentication

None. Public, anonymous endpoint. Rate-limit enforced at the network layer (1 req/s).

## Request example

```bash
curl -X POST 'https://webservicesp.anaf.ro/PlatitorTvaRest/api/v9/ws/tva' \
  -H 'Content-Type: application/json' \
  -d '[{"cui": 43990858, "data": "2026-05-27"}]'
```

## Response example

```json
{
  "cod": 200,
  "message": "SUCCESS",
  "found": [
    {
      "date_generale": {
        "cui": 43990858,
        "denumire": "FORTITUDO VINCIT SRL",
        "adresa": "...",
        "scpTVA": true,
        "data_inceput_ScpTVA": "2021-04-01",
        "statusInactivi": false
      },
      "inregistrare_scop_Tva": { "scpTVA": true },
      "inregistrare_RTVAI": { "statusTvaIncasare": false },
      "stare_inactiv": { "statusInactivi": false },
      "inregistrare_SplitTVA": { "statusSplitTVA": false },
      "adresa_sediu_social": { },
      "adresa_domiciliu_fiscal": { }
    }
  ],
  "notFound": []
}
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| PHP | `itrack/anaf` (Packagist) | active 2026 | v2 vs v3 breaking change |
| PHP | `andalisolutions/anaf-php` | active 2025-08 (v0.8.1) | PHP 8.2+ |
| TS | `florin-szilagyi/efactura-anaf-ts-sdk` | active 2026-05 | Includes MCP server |
| REST proxy | `eranova-digital/datacore` | active 2025-11 | Cached REST facade |
| Wrapper UI | `everifica.ro`, `demoanaf.ro` | active 2026 | demoanaf.ro adds Redis cache + `/api/company/:cui`, `/balance/:year` |

## Testing approach

- [x] Direct HTTP test (curl / fetch) — works without UA spoof
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available — use `aperta-sync/anaf-api-simulator` for local dev
- [x] Local simulator: `aperta-sync/anaf-api-simulator` (v0.8.1, 2026-05-14)

## Known issues / gotchas

- 1 req/s hard limit — bursts get 429/connection-reset; batch up to 100 CUI per call
- Date must be ISO `YYYY-MM-DD`
- `cui` must be numeric (no `RO` prefix); strip leading zeros
- Endpoint returns `cod: 200` on success even when nothing is found — check `found`/`notFound` arrays
- Schema occasionally extended with new sub-objects without version bump — be lenient in parsers
- v8 still answers but is officially retired 2025-05-01 — DO NOT use v8 in new code

## Tutorial seeds (for content pipeline)

- "Verifică un CUI românesc în Node.js cu ANAF v9 în 10 linii"
- "Batch lookup 1000 CUIs respecting ANAF's 1 rps limit (queue patterns)"
- "Caching ANAF v9 responses with Redis & stale-while-revalidate"
- "Why your e-Factura SDK still calls v8 — and how to migrate"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (community-authored — none official)
- [ ] Thin REST wrapper with rate-limiter + batching (BrasilAPI-style facade)
- [ ] MCP tool exposed via FastMCP (`anaf_vat_lookup`)
- [ ] Code samples (Node/Python/PHP/Go)

## References

- Official docs: https://static.anaf.ro/static/10/Anaf/Informatii_R/Servicii_web/doc_WS_V9.txt
- ANAF web services index: https://www.anaf.ro/anaf/internet/ANAF/servicii_online/
- Local simulator: https://github.com/aperta-sync/anaf-api-simulator
- Last manual verification: 2026-05-27
