---
slug: anaf-efactura-prod
title: RO e-Factura — Production
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
pricing: mandatory
rate_limit: "unknown — fair-use, complaints when >1 req/s sustained"
official_docs: https://mfinante.gov.ro/en/web/efactura/informatii-tehnice
api_base_url: https://api.anaf.ro/prod/FCTEL/rest
last_known_version: "current (UBL 2.1, CIUS-RO)"
mandatory_for_business: true
---

# RO e-Factura — Production

## Overview

National electronic invoicing system mandatory for all B2B and B2G transactions in Romania since 2024 (B2C added 2026). Invoices are sent as XML (UBL 2.1 with CIUS-RO profile) to ANAF, which assigns an upload `index_incarcare`, validates, and produces a signed response XML. The receiving party downloads the invoice through the same API.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `https://api.anaf.ro/prod/FCTEL/rest/upload?standard=UBL&cif={CIF}` | Upload invoice XML |
| GET | `https://api.anaf.ro/prod/FCTEL/rest/stareMesaj?id_incarcare={id}` | Check processing status |
| GET | `https://api.anaf.ro/prod/FCTEL/rest/listaMesajeFactura?zile={1..60}&cif={CIF}` | List received messages |
| GET | `https://api.anaf.ro/prod/FCTEL/rest/descarcare?id={id_descarcare}` | Download invoice ZIP |
| POST | `https://api.anaf.ro/prod/FCTEL/rest/uploadb2c` | B2C upload (since 2026) |

## Authentication

OAuth2 authorization-code flow with a **qualified digital certificate**. Flow:

1. Obtain qualified cert from a Romanian QTSP (certSIGN, DigiSign, AlfaSign, Trans Sped).
2. Register the application at SPV → "Înregistrare aplicații Oauth".
3. Authorize at `https://logincert.anaf.ro/anaf-oauth2/v1/authorize` (browser, cert prompt).
4. Exchange code at `https://logincert.anaf.ro/anaf-oauth2/v1/token`.
5. Use `Authorization: Bearer {access_token}` on every call. Token life ≈ 90 days, refresh token ≈ 365 days.

## Request example

```bash
curl -X POST 'https://api.anaf.ro/prod/FCTEL/rest/upload?standard=UBL&cif=43990858' \
  -H 'Authorization: Bearer eyJraWQ...' \
  -H 'Content-Type: text/plain' \
  --data-binary @invoice-ubl.xml
```

## Response example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<header xmlns="mfp:anaf:dgti:spv:respUploadFisier:v1"
        dateResponse="202605271230"
        ExecutionStatus="0"
        index_incarcare="123456789"/>
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| TS | `florin-szilagyi/efactura-anaf-ts-sdk` | active 2026-05 | UBL builder + MCP server bundled |
| Go | `printesoi/e-factura-go` | active 2026-01 | OAuth2 helper + UBL types |
| PHP | `andalisolutions/anaf-php` | active 2025-08 | PHP 8.2+ |
| PHP | `mihai3332001/oauth2-anaf` | stale 2023 | 3 commits ever |

## Testing approach

- [x] Sandbox available at `https://api.anaf.ro/test/FCTEL/rest/...` (see `anaf-efactura-test`)
- [x] Local simulator: `aperta-sync/anaf-api-simulator`
- [ ] Production calls require a real CIF + qualified cert — do NOT test against prod with synthetic data
- [x] Validate XML against official XSDs from mfinante.gov.ro before upload

## Known issues / gotchas

- Qualified cert is hardware-bound (token/smartcard) — bootstrap takes 2-5 business days
- OAuth refresh tokens silently invalidate if the cert is replaced — re-authorize after every cert renewal
- `stareMesaj` returns `in prelucrare` for several minutes — poll with backoff, not tight loop
- Validation errors come back inside the response XML, NOT as HTTP 4xx — always parse the body
- `listaMesajeFactura` window is max **60 days** — for older messages use Paginated variant `listaMesajePaginatieFactura`
- UBL must follow **CIUS-RO** profile — generic UBL 2.1 will be rejected

## Tutorial seeds (for content pipeline)

- "Send your first e-Factura invoice from Node.js (sandbox to prod)"
- "OAuth2 with qualified cert on ANAF — full walkthrough"
- "Reading B2B inbox: listaMesajeFactura + descarcare in 30 lines"
- "Common UBL CIUS-RO validation errors and how to fix them"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] OpenAPI 3.1 spec (community)
- [ ] Thin REST wrapper that hides OAuth + XML
- [ ] MCP tools: `efactura_send`, `efactura_status`, `efactura_inbox`, `efactura_download`
- [ ] Code samples (Node/Python/PHP/Go)

## References

- Technical info: https://mfinante.gov.ro/en/web/efactura/informatii-tehnice
- OAuth procedure PDF: https://static.anaf.ro/static/10/Anaf/Informatii_R/API/Oauth_procedura_inregistrare_aplicatii_portal_ANAF.pdf
- Reference TS SDK + MCP: https://github.com/florin-szilagyi/efactura-anaf-ts-sdk
- Last manual verification: 2026-05-27
