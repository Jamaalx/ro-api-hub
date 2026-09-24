---
slug: anaf-etransport
title: RO e-Transport
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
rate_limit: "unknown — fair-use"
official_docs: https://static.anaf.ro/static/10/Anaf/Informatii_R/RO_e-Transport/Ghid_RO_e_Transport_2025.pdf
api_base_url: https://api.anaf.ro/prod/ETRANSPORT/ws/v1
last_known_version: "v1 (2025 schema)"
mandatory_for_business: true
---

# RO e-Transport

## Overview

National system for declaring the road transport of goods with fiscal risk (initially) and ALL international + intra-community road transports (since 2024). The carrier or operator submits an XML declaration before transport begins and receives a UIT (Unique Identification Code) that must accompany the goods. Failure to declare incurs heavy fines + confiscation.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `https://api.anaf.ro/prod/ETRANSPORT/ws/v1/upload/{tip}/{CIF}` | Submit declaration (`tip` = ETRANSP / NOTIFICARE / CONFIRMARE / STERGERE) |
| GET | `https://api.anaf.ro/prod/ETRANSPORT/ws/v1/stareMesaj/{id_incarcare}` | Status |
| GET | `https://api.anaf.ro/prod/ETRANSPORT/ws/v1/lista/{zile}/{CIF}` | List messages (≤60 days) |
| GET | `https://api.anaf.ro/prod/ETRANSPORT/ws/v1/descarcare/{id}` | Download UIT response |
| Test base | `https://api.anaf.ro/test/ETRANSPORT/ws/v1/...` | Sandbox |

## Authentication

Same OAuth2 + qualified-cert flow as e-Factura (`logincert.anaf.ro`). The token grants access to both e-Factura and e-Transport scopes.

## Request example

```bash
curl -X POST 'https://api.anaf.ro/prod/ETRANSPORT/ws/v1/upload/ETRANSP/43990858' \
  -H 'Authorization: Bearer eyJraWQ...' \
  -H 'Content-Type: text/plain' \
  --data-binary @etransport-declaration.xml
```

## Response example

```xml
<header xmlns="mfp:anaf:dgti:eTransport:respUploadFisier:v1"
        dateResponse="202605271400"
        ExecutionStatus="0"
        index_incarcare="555000111"
        UIT="3ABC123XYZ456"/>
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| TS | `florin-szilagyi/efactura-anaf-ts-sdk` | partial — focus is e-Factura; same OAuth client | active 2026-05 |
| docs | `docs.socrate.io` (community) | reference XML samples | active |

No mature e-Transport-specific SDK exists — most integrators extend an e-Factura library.

## Testing approach

- [x] Sandbox at `https://api.anaf.ro/test/ETRANSPORT/ws/v1/...`
- [x] Validate XML against official XSDs (linked from the 2025 ghid)
- [ ] Local simulator: `aperta-sync/anaf-api-simulator` covers it partially
- [ ] No public e-Transport happy-path on demoanaf.ro yet

## Known issues / gotchas

- **Link check 2026-09-24:** `official_docs` https://static.anaf.ro/static/10/Anaf/Informatii_R/RO_e-Transport/Ghid_RO_e_Transport_2025.pdf → HTTP 404. Needs a human to find the new URL.
- Schema changed multiple times in 2024-2025 — make sure you use the **2025** XSDs
- UIT becomes invalid if transport doesn't start within 5 calendar days — must STERGERE + re-submit
- Modification window after submission is narrow — design UI for "draft → confirm" flow
- Border-crossing transports require `NOTIFICARE` + `CONFIRMARE` after the truck passes — easy to forget in automation
- Mfinante PDF guide (OUG 115/2023 era) is stale; the canonical reference is the 2025 ANAF PDF (link above)

## Tutorial seeds (for content pipeline)

- "Declarând un transport intracomunitar prin e-Transport în 5 pași"
- "Validating an e-Transport XML against the 2025 XSDs in Node"
- "Auto-renewing OAuth tokens for combined e-Factura + e-Transport access"
- "Confirmare la trecerea graniței: webhook pattern for fleet GPS"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] OpenAPI 3.1 spec (community)
- [ ] Wrapper sharing OAuth client with e-Factura
- [ ] MCP tools: `etransport_declare`, `etransport_status`, `etransport_confirm`, `etransport_delete`

## References

- Ghid 2025 (canonical): https://static.anaf.ro/static/10/Anaf/Informatii_R/RO_e-Transport/Ghid_RO_e_Transport_2025.pdf
- Older OUG 115/2023 PDF (stale, do not link new content): https://mfinante.gov.ro/static/10/Mfp/GhidROe-Transport.pdf
- Last manual verification: 2026-05-27
