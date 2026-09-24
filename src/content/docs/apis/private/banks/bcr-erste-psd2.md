---
slug: bcr-erste-psd2
title: BCR / Erste Group Open Banking (PSD2)
category: banks
institution: Banca Comercială Română (Erste Group)
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: oauth2
protocol: REST/JSON
openapi_spec: true
sandbox_available: true
contract_required: true
pricing: free
rate_limit: unknown
official_docs: https://developers.erstegroup.com/
api_base_url: unknown
last_known_version: "Berlin Group NextGenPSD2 v1.3"
mandatory_for_business: false
---

# BCR / Erste Group Open Banking (PSD2)

## Overview

Unified developer portal for the Erste Group covering BCR Romania. Implements the Berlin Group NextGenPSD2 specification with 8+ APIs: Accounts (AISP), Payments (PISP), Funds Confirmation (PIISP), KYC, Places (ATMs/branches), FX rates, and Mortgage. Free tier for PSD2 regulated APIs; premium APIs gated by commercial contract.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | unknown (per Berlin Group: `/v1/accounts`) | List PSU accounts |
| GET | unknown (`/v1/accounts/{id}/transactions`) | Account transactions |
| POST | unknown (`/v1/payments/{product}`) | Initiate SEPA / instant payment |
| GET | unknown | ATM / branch locator (Places) |

## Authentication

OAuth2 Authorization Code flow for PSU consent + eIDAS QWAC for mTLS transport. Production access requires a PSD2 / QWAC qualified certificate from a QTSP. Sandbox uses test certificates issued via the Erste developer portal.

## Request example

```bash
# Sandbox skeleton — replace base URL after registration
curl -X GET 'https://webapi.developers.erstegroup.com/api/bcr/.../v1/accounts' \
  -H 'Authorization: Bearer <token>' \
  -H 'X-Request-ID: <uuid>' \
  --cert qwac.pem --key qwac.key
```

## Response example

```json
{ "accounts": [{ "resourceId": "...", "iban": "RO..", "currency": "RON" }] }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | — | — | No official Erste SDK; use generic Berlin Group clients |

## Testing approach

- [x] Sandbox available at https://developers.erstegroup.com/
- [ ] mTLS client cert required even in sandbox (test QWAC provided)
- [ ] Berlin Group Postman collection (community)

## Known issues / gotchas

- Finqware 2024 benchmark of 16 RO bank PSD2 APIs rated quality from "excellent to extremely unreliable" — **3 of 16 broken in prod**
- Production requires real eIDAS QWAC from a QTSP (cost + onboarding lag)
- Premium APIs are paywalled and contract-gated
- Berlin Group spec leaves room for bank-specific deviations

## Tutorial seeds (for content pipeline)

- "Getting started with BCR PSD2 sandbox in Node.js"
- "Generating eIDAS QWAC test certificates for Erste"
- "Berlin Group AISP consent flow end-to-end"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] Berlin Group OpenAPI 3.1 alias
- [ ] Thin REST wrapper with cert mgmt
- [ ] MCP tool exposed via FastMCP
- [ ] Code samples (Node/Python/PHP)

## References

- Official docs: https://developers.erstegroup.com/
- Berlin Group spec: https://www.berlin-group.org/nextgenpsd2-downloads
- Finqware benchmark 2024: public report on RO PSD2 quality
- Last manual verification: 2026-05-27
