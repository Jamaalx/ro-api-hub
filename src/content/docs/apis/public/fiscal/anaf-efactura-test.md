---
slug: anaf-efactura-test
title: RO e-Factura — Sandbox (Test)
category: fiscal
institution: ANAF / Ministerul Finanțelor
country: RO
status: active
verified_at: 2026-05-27
auth: oauth2
protocol: REST/XML
openapi_spec: partial
sandbox_available: true
contract_required: false
pricing: free
rate_limit: "unknown — fair-use"
official_docs: https://mfinante.gov.ro/en/web/efactura/informatii-tehnice
api_base_url: https://api.anaf.ro/test/FCTEL/rest
last_known_version: "current (UBL 2.1, CIUS-RO)"
mandatory_for_business: false
---

# RO e-Factura — Sandbox (Test)

## Overview

Official sandbox of the production e-Factura system. Same endpoints under `/test/` instead of `/prod/`. Accepts the SAME qualified-cert OAuth2 flow but does not generate fiscally valid invoices — use it for integration testing, schema validation and end-to-end CI.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `https://api.anaf.ro/test/FCTEL/rest/upload?standard=UBL&cif={CIF}` | Upload test invoice |
| GET | `https://api.anaf.ro/test/FCTEL/rest/stareMesaj?id_incarcare={id}` | Status |
| GET | `https://api.anaf.ro/test/FCTEL/rest/listaMesajeFactura?zile={n}&cif={CIF}` | Inbox |
| GET | `https://api.anaf.ro/test/FCTEL/rest/descarcare?id={id}` | Download |

## Authentication

Identical to production (`logincert.anaf.ro` OAuth2 with qualified cert). The same access_token works against both `/prod/` and `/test/` (the scope is global). Some integrators register a SEPARATE OAuth client for test to keep telemetry clean.

## Request example

```bash
curl -X POST 'https://api.anaf.ro/test/FCTEL/rest/upload?standard=UBL&cif=43990858' \
  -H 'Authorization: Bearer eyJraWQ...' \
  -H 'Content-Type: text/plain' \
  --data-binary @invoice-ubl.xml
```

## Response example

```xml
<header xmlns="mfp:anaf:dgti:spv:respUploadFisier:v1"
        dateResponse="202605271230"
        ExecutionStatus="0"
        index_incarcare="987654321"/>
```

## Existing SDKs / wrappers

Same as production (`florin-szilagyi/efactura-anaf-ts-sdk`, `printesoi/e-factura-go`, `andalisolutions/anaf-php`) — all toggle base URL via env / constructor flag.

For pure local testing without ANAF dependency: **`aperta-sync/anaf-api-simulator`** (v0.8.1, 2026-05-14) implements the same surface offline.

## Testing approach

- [x] Direct HTTP test — works once OAuth done
- [x] Sandbox available at `https://api.anaf.ro/test/FCTEL/rest/...`
- [x] Local simulator: `aperta-sync/anaf-api-simulator` (no network, no cert)
- [x] Validate XML against XSDs before upload

## Known issues / gotchas

- Sandbox **shares** the OAuth2 infrastructure with prod — a misconfigured BASE_URL can leak prod traffic
- Test messages still appear in your real SPV inbox (flagged) — do not expose customer data
- Sandbox stareMesaj may stay `in prelucrare` slightly longer than prod (no SLA)
- No fiscal value: do NOT use sandbox responses to "prove" you invoiced something

## Tutorial seeds (for content pipeline)

- "Set up an e-Factura sandbox account in 30 minutes"
- "CI pipeline: validate every invoice your app produces against ANAF test"
- "Switching between /test/ and /prod/ safely with environment guards"

## ro-api-hub integration plan

- [ ] Same wrapper as prod with `mode: 'test'|'prod'` flag
- [ ] MCP tool exposing sandbox mode for safe agent experiments
- [ ] Default to sandbox in all code samples

## References

- Technical info: https://mfinante.gov.ro/en/web/efactura/informatii-tehnice
- Local simulator: https://github.com/aperta-sync/anaf-api-simulator
- Last manual verification: 2026-05-27
