---
slug: cec-bank-psd2
title: CEC Bank Open Banking (PSD2)
category: banks
institution: CEC Bank S.A. (state-owned)
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
official_docs: https://www.cec.ro/api-uri-psd2
api_base_url: unknown
last_known_version: "Berlin Group NextGenPSD2"
mandatory_for_business: false
---

# CEC Bank Open Banking (PSD2)

## Overview

State-owned CEC Bank's PSD2 portal. Berlin Group spec. Notably partnered with Finqware for open banking aggregation infrastructure.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | unknown (`/v1/accounts`) | AISP |
| GET | unknown (`/v1/accounts/{id}/transactions`) | Transactions |
| POST | unknown (`/v1/payments/{product}`) | PISP |

## Authentication

OAuth2 + eIDAS QWAC mTLS.

## Request example

```bash
curl -X GET 'https://psd2.cec.ro/.../v1/accounts' \
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
| — | Finqware aggregator | commercial | Not an SDK, but commonly used to abstract CEC |

## Testing approach

- [x] Sandbox at https://www.cec.ro/api-uri-psd2
- [ ] Test QWAC required

## Known issues / gotchas

- Finqware 2024 benchmark — **3 of 16 RO bank PSD2 APIs broken in prod**
- State-owned: slower onboarding cadence

## Tutorial seeds

- "CEC Bank PSD2 sandbox onboarding"
- "Using Finqware to aggregate CEC + other RO banks"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] OpenAPI mirror
- [ ] Wrapper + MCP tool

## References

- Official: https://www.cec.ro/api-uri-psd2
- Berlin Group: https://www.berlin-group.org/nextgenpsd2-downloads
- Last manual verification: 2026-05-27
