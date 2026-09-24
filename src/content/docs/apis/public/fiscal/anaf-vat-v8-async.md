---
slug: anaf-vat-v8-async
title: ANAF VAT Async Web Service v8 (RETIRED)
category: fiscal
institution: ANAF
country: RO
status: stale
verified_at: 2026-05-27
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: "1 req/s"
official_docs: https://static.anaf.ro/static/10/Anaf/Informatii_R/Servicii_web/doc_WS_Async_V8.txt
api_base_url: https://webservicesp.anaf.ro/AsynchWebService/api/v8/ws/tva
last_known_version: "v8"
mandatory_for_business: false
---

# ANAF VAT Async Web Service v8 — RETIRED

## Overview

Historic asynchronous variant of the ANAF VAT/CUI verification service. Allowed submitting up to 500 CUIs and polling for results. **Officially retired on 2025-05-01.** Endpoint may still answer for grace-period clients but new integrations MUST use v9 (synchronous, 100 CUI/batch).

This entry exists for migration reference only.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `https://webservicesp.anaf.ro/AsynchWebService/api/v8/ws/tva` | Submit batch / poll result (RETIRED) |

## Authentication

None.

## Request example

```bash
# DO NOT USE IN NEW CODE — migrate to v9
curl -X POST 'https://webservicesp.anaf.ro/AsynchWebService/api/v8/ws/tva' \
  -H 'Content-Type: application/json' \
  -d '[{"cui": 43990858, "data": "2025-04-30"}]'
```

## Response example

```json
{ "cod": 200, "message": "SUCCESS", "found": [ ], "notFound": [ ] }
```

(Shape same as v9 minus newer sub-objects.)

## Existing SDKs / wrappers

Same SDKs as v9 — most have already removed v8 support or hidden it behind a deprecated flag:

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| PHP | `itrack/anaf` v2 | uses v8 | v3 dropped v8 |
| PHP | `andalisolutions/anaf-php` | migrated to v9 | — |
| TS | `florin-szilagyi/efactura-anaf-ts-sdk` | v9-only | — |

## Testing approach

- [ ] Do not test — service is being decommissioned
- [x] If you must compare v8 vs v9 output, run both against `aperta-sync/anaf-api-simulator`

## Known issues / gotchas

- **Timeout is expected (2026-09-24):** `webservicesp.anaf.ro` resolves and the v9 service on the same host answers, but the v8 async path no longer answers at all — consistent with the 2025-05-01 retirement. Nothing to fix; use v9.
- **RETIRED 2025-05-01** — schedule migration immediately
- v8 misses several fields added in v9 (`inregistrare_RTVAI`, full `adresa_*` blocks)
- Async polling pattern was rarely needed since v9 batches 100 CUI synchronously

## Tutorial seeds (for content pipeline)

- "Migrating from ANAF VAT v8 to v9 — a field-by-field diff"
- "Detect v8-dependent code in your project with a single grep"

## ro-api-hub integration plan

- [ ] Mark as deprecated in catalogue with `status: stale`
- [ ] Add redirect note → `anaf-vat-v9`
- [ ] No SDK / wrapper / MCP tool

## References

- v8 docs (historic): https://static.anaf.ro/static/10/Anaf/Informatii_R/Servicii_web/doc_WS_Async_V8.txt
- v9 docs (canonical): https://static.anaf.ro/static/10/Anaf/Informatii_R/Servicii_web/doc_WS_V9.txt
- Last manual verification: 2026-05-27
