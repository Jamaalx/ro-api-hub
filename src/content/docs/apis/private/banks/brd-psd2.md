---
slug: brd-psd2
title: BRD - Société Générale API Catalog (PSD2)
category: banks
institution: BRD - Groupe Société Générale
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
official_docs: https://www.devbrd.ro/brd/apicatalog/
api_base_url: unknown
last_known_version: "Berlin Group NextGenPSD2"
mandatory_for_business: false
---

# BRD - Société Générale API Catalog (PSD2)

## Overview

BRD developer portal (`devbrd.ro`) exposes the Berlin Group PSD2 stack for both Retail and Corporate customers. Free PSD2 sandbox + premium APIs under SocGen group commercial agreements.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | unknown (`/v1/accounts`) | AISP accounts |
| GET | unknown (`/v1/accounts/{id}/transactions`) | Transactions |
| POST | unknown (`/v1/payments/{product}`) | PISP payment init |

## Authentication

OAuth2 PSU consent + eIDAS QWAC mTLS. Sandbox issues test QWAC. Prod requires QTSP-issued QWAC.

## Request example

```bash
curl -X GET 'https://api.devbrd.ro/.../v1/accounts' \
  -H 'Authorization: Bearer <token>' \
  -H 'X-Request-ID: <uuid>' \
  --cert qwac.pem --key qwac.key
```

## Response example

```json
{ "accounts": [{ "iban": "RO...", "currency": "RON" }] }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | — | — | No official SDK |

## Testing approach

- [x] Sandbox at https://www.devbrd.ro/brd/apicatalog/
- [ ] Test QWAC required
- [ ] Berlin Group Postman collection

## Known issues / gotchas

- Finqware 2024 benchmark — **3 of 16 RO bank PSD2 APIs broken in prod**
- Retail vs Corporate flows differ
- Premium APIs require SocGen contract

## Tutorial seeds

- "BRD sandbox onboarding"
- "Retail vs Corporate PSD2 differences at BRD"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] OpenAPI mirror
- [ ] Wrapper + MCP tool
- [ ] Multi-lang samples

## References

- Official: https://www.devbrd.ro/brd/apicatalog/
- Berlin Group: https://www.berlin-group.org/nextgenpsd2-downloads
- Last manual verification: 2026-05-27
