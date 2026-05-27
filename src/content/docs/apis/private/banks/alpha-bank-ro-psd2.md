---
slug: alpha-bank-ro-psd2
title: Alpha Bank Romania Open Banking (PSD2)
category: banks
institution: Alpha Bank Romania S.A.
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
official_docs: https://www.openbankingtracker.com/api/alpha-bank-romania
api_base_url: unknown
last_known_version: "Berlin Group NextGenPSD2"
mandatory_for_business: false
---

# Alpha Bank Romania Open Banking (PSD2)

## Overview

Alpha Bank Romania's PSD2 stack. Discovery is via `openbankingtracker.com` since the bank's own developer landing page is less prominent. Berlin Group spec.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | unknown (`/v1/accounts`) | AISP |
| GET | unknown (`/v1/accounts/{id}/transactions`) | Transactions (unstructured fields) |
| POST | unknown (`/v1/payments/{product}`) | PISP |

## Authentication

OAuth2 + eIDAS QWAC mTLS.

## Request example

```bash
curl -X GET 'https://psd2.alphabank.ro/.../v1/accounts' \
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

- [x] Sandbox available (linked from openbankingtracker.com)
- [ ] Test QWAC required

## Known issues / gotchas

- Finqware 2024 benchmark — **3 of 16 RO bank PSD2 APIs broken in prod** (Alpha frequently flagged for data quality)
- Transaction-data fields are unstructured / free-text — parsing required
- Developer portal less discoverable than peers

## Tutorial seeds

- "Parsing Alpha Bank's unstructured transaction data"
- "Alpha Bank RO PSD2 sandbox onboarding"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] OpenAPI mirror
- [ ] Wrapper with transaction parser
- [ ] MCP tool

## References

- Tracker: https://www.openbankingtracker.com/api/alpha-bank-romania
- Berlin Group: https://www.berlin-group.org/nextgenpsd2-downloads
- Last manual verification: 2026-05-27
