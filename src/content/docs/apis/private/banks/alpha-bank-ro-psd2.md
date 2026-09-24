---
slug: alpha-bank-ro-psd2
title: Alpha Bank Romania Open Banking (PSD2)
category: banks
institution: Alpha Bank Romania S.A.
country: RO
status: suspended
verified_at: 2026-05-27
auth: oauth2
protocol: REST/JSON
openapi_spec: true
sandbox_available: true
contract_required: true
pricing: free
rate_limit: unknown
official_docs: https://www.unicredit.ro/ro/institutional/banca/fuziune-AlphaBank.html
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

- **Bank absorbed (2026-09-24):** Alpha Bank România merged into **UniCredit Bank S.A.** (merger by absorption, completed August 2025 — UniCredit's BVB notice of 2025-08-22). There is no separate Alpha Bank PSD2 interface any more. **Alternative:** UniCredit's group developer portal `https://developer.unicredit.eu/` (Berlin Group; UniCredit Bank S.A. – Romania has production APIs there). The old `official_docs` link is a third-party tracker that answers 429 (Vercel bot checkpoint) to scripts.
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
- UniCredit — merger completed (BVB, 2025-08-22): https://www.bvb.ro/infocont/infocont25/UCB27_20250822153248_RO-Anunt-finalizare-fuziune.pdf
- UniCredit merger info page: https://www.unicredit.ro/ro/institutional/banca/fuziune-AlphaBank.html
- Successor PSD2 portal: https://developer.unicredit.eu/
- Last manual verification: 2026-05-27
