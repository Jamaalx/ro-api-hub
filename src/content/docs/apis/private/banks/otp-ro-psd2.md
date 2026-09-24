---
slug: otp-ro-psd2
title: OTP Bank Romania Open Banking (PSD2)
category: banks
institution: OTP Bank Romania S.A.
country: RO
status: suspended
verified_at: 2026-05-27
auth: oauth2
protocol: REST/JSON
openapi_spec: true
sandbox_available: true
contract_required: true
pricing: free
rate_limit: "4 updates/day per consent (AISP)"
official_docs: https://devch.otpdirekt.ro/prod-devch/developer-portal/
api_base_url: unknown
last_known_version: "Berlin Group NextGenPSD2"
mandatory_for_business: false
---

# OTP Bank Romania Open Banking (PSD2)

## Overview

OTP Romania PSD2 developer portal (`devch.otpdirekt.ro`). Berlin Group spec. Enforces the regulator-allowed minimum of **4 unattended account-data refreshes per consent per day**.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | unknown (`/v1/accounts`) | AISP |
| GET | unknown (`/v1/accounts/{id}/transactions`) | Transactions |
| POST | unknown (`/v1/payments/{product}`) | PISP |

## Authentication

OAuth2 PSU consent + eIDAS QWAC mTLS.

## Request example

```bash
curl -X GET 'https://devch.otpdirekt.ro/.../v1/accounts' \
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

- [x] Sandbox at https://devch.otpdirekt.ro/prod-devch/developer-portal/
- [ ] Test QWAC required

## Known issues / gotchas

- **Service gone (2026-09-24):** OTP Bank România was absorbed by Banca Transilvania; the merger took effect on **2025-02-28** and OTP customers became BT customers. `devch.otpdirekt.ro` and `www.otpbank.ro` no longer resolve. **Alternative:** Banca Transilvania's PSD2 API — see [bt-psd2](/bt-psd2/) (`https://apistorebt.ro/bt/sb/`).
- Finqware 2024 benchmark — **3 of 16 RO bank PSD2 APIs broken in prod**
- Hard cap: 4 background AISP refreshes per day per consent
- Portal URL is awkward — easy to misroute

## Tutorial seeds

- "Working within the 4-refresh-per-day limit at OTP RO"
- "OTP RO PSD2 sandbox"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] OpenAPI mirror
- [ ] Wrapper + MCP tool

## References

- Official: https://devch.otpdirekt.ro/prod-devch/developer-portal/
- Berlin Group: https://www.berlin-group.org/nextgenpsd2-downloads
- BT press release (merger effective 2025-02-28): https://www.bancatransilvania.ro/news/comunicate-de-presa/otp-bank-romania-devine-banca-transilvania-in-28-februarie-2025
- Successor PSD2 portal: https://apistorebt.ro/bt/sb/
- Last manual verification: 2026-05-27
