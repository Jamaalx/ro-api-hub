---
slug: garanti-bbva-ro-psd2
title: Garanti BBVA Romania Open Banking (PSD2)
category: banks
institution: Garanti Bank S.A. (BBVA group)
country: RO
status: active
verified_at: 2026-05-27
auth: oauth2
protocol: REST/JSON
openapi_spec: true
sandbox_available: true
contract_required: true
pricing: free
rate_limit: unknown
official_docs: https://developers.garantibbva.ro/
api_base_url: unknown
last_known_version: "Berlin Group NextGenPSD2"
mandatory_for_business: false
---

# Garanti BBVA Romania Open Banking (PSD2)

## Overview

Garanti BBVA Romania exposes Berlin Group PSD2 APIs through a Layer7 (Broadcom) API gateway portal at `developers.garantibbva.ro`.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | unknown (`/v1/accounts`) | AISP |
| GET | unknown (`/v1/accounts/{id}/transactions`) | Transactions |
| POST | unknown (`/v1/payments/{product}`) | PISP |

## Authentication

OAuth2 + eIDAS QWAC mTLS, fronted by CA Layer7 API Gateway.

## Request example

```bash
curl -X GET 'https://developers.garantibbva.ro/.../v1/accounts' \
  -H 'Authorization: Bearer <token>' \
  -H 'X-Request-ID: <uuid>' \
  --cert qwac.pem --key qwac.key
```

## Response example

```json
{ "accounts": [{ "iban": "RO..." }] }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | — | — | No official SDK |

## Testing approach

- [x] Sandbox at https://developers.garantibbva.ro/
- [ ] Test QWAC required
- [ ] Layer7 portal quirks (account approval lag)

## Known issues / gotchas

- Finqware 2024 benchmark — **3 of 16 RO bank PSD2 APIs broken in prod**
- Layer7 portal sometimes rate-limits anonymous browsing
- Smaller share of RO PSD2 traffic — less community tooling

## Tutorial seeds

- "Garanti BBVA RO PSD2 sandbox"
- "Berlin Group on Layer7 — handling portal quirks"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] OpenAPI mirror
- [ ] Wrapper + MCP tool

## References

- Official: https://developers.garantibbva.ro/
- Berlin Group: https://www.berlin-group.org/nextgenpsd2-downloads
- Last manual verification: 2026-05-27
