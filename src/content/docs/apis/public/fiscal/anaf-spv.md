---
slug: anaf-spv
title: Spațiul Privat Virtual (SPV) Web Service
category: fiscal
institution: ANAF
country: RO
status: active
verified_at: 2026-05-27
auth: oauth2
protocol: REST/JSON+PDF
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: "unknown"
official_docs: https://github.com/MfpAnaf/ClientSPV
api_base_url: https://webserviced.anaf.ro/SPVWS2/rest
last_known_version: "WS2"
mandatory_for_business: false
---

# Spațiul Privat Virtual (SPV) Web Service

## Overview

SPV is ANAF's authenticated taxpayer portal — citizens and companies use it to receive fiscal correspondence, download tax decisions, submit declarations, and access pre-filled forms. The SPV WS2 REST API exposes the same inbox programmatically: list messages, download attachments, push declarations.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://webserviced.anaf.ro/SPVWS2/rest/listaMesaje?zile={n}&cif={CIF}` | List messages |
| GET | `https://webserviced.anaf.ro/SPVWS2/rest/descarcare?id={id}` | Download attachment (PDF/XML/ZIP) |
| POST | `https://webserviced.anaf.ro/SPVWS2/rest/upload` | Submit declaration (D112, D300, D406 SAF-T, etc.) |
| GET | `https://webserviced.anaf.ro/SPVWS2/rest/stareMesaj?id_incarcare={id}` | Submission status |

## Authentication

OAuth2 + qualified-cert flow via `logincert.anaf.ro` — same as e-Factura / e-Transport. The same access token grants access to SPV WS2 if the OAuth app was registered with SPV scope enabled.

## Request example

```bash
curl 'https://webserviced.anaf.ro/SPVWS2/rest/listaMesaje?zile=30&cif=43990858' \
  -H 'Authorization: Bearer eyJraWQ...'
```

## Response example

```json
{
  "mesaje": [
    {
      "data_creare": "202605201430",
      "cif": "43990858",
      "id_solicitare": "0",
      "detalii": "Decizie impunere ...",
      "tip": "DECIZIE",
      "id": "9876543210"
    }
  ],
  "serial": "...",
  "cui": "43990858",
  "titlu": "Lista Mesaje SPV"
}
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Java | `MfpAnaf/ClientSPV` | stale — 10 commits ever, no releases | Official-ish reference impl |
| TS | `florin-szilagyi/efactura-anaf-ts-sdk` | partial | Inbox helpers reusing OAuth client |
| PHP | `andalisolutions/anaf-php` | active 2025-08 | Inbox + download |

## Testing approach

- [ ] No public sandbox — requires real CIF + qualified cert
- [x] Local simulator: `aperta-sync/anaf-api-simulator` (partial)
- [x] Unit-test the JSON parsing layer with captured fixtures

## Known issues / gotchas

- Reference implementation (`MfpAnaf/ClientSPV`) is essentially abandoned — do not copy verbatim
- `listaMesaje` window max **60 days** — older messages via `listaMesajePaginatie`
- Some attachments come as ZIPs containing both PDF and signed XML — handle both
- Inbox includes notifications for e-Factura / e-Transport — easy double-processing if you also poll those APIs directly
- Submission XML must be signed with the qualified cert (XAdES) before upload for some declaration types

## Tutorial seeds (for content pipeline)

- "Read your ANAF inbox programmatically (SPV WS2 in 25 lines)"
- "Download every tax decision from SPV as PDFs into S3"
- "Submitting D406 SAF-T through SPV without DUKIntegrator"
- "De-duplicating notifications across SPV, e-Factura and e-Transport"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] OpenAPI 3.1 spec (community)
- [ ] Wrapper sharing OAuth client with other ANAF services
- [ ] MCP tools: `spv_inbox`, `spv_download`, `spv_submit`

## References

- Reference Java client: https://github.com/MfpAnaf/ClientSPV
- ANAF services hub: https://www.anaf.ro/anaf/internet/ANAF/servicii_online/
- Last manual verification: 2026-05-27
