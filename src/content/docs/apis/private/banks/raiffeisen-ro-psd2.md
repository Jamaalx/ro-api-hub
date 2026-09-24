---
slug: raiffeisen-ro-psd2
title: Raiffeisen Bank Romania Open Banking (PSD2)
category: banks
institution: Raiffeisen Bank S.A. Romania
country: RO
status: stale
verified_at: 2026-05-27
auth: oauth2
protocol: REST/JSON
openapi_spec: true
sandbox_available: true
contract_required: true
pricing: free
rate_limit: unknown
official_docs: https://www.raiffeisen.ro/ro/persoane-fizice/in-sprijinul-tau/informatii-utile/platforma-de-testare-a-serviciilor-de-plata.html
api_base_url: unknown
last_known_version: "Berlin Group NextGenPSD2"
mandatory_for_business: false
---

# Raiffeisen Bank Romania Open Banking (PSD2)

## Overview

Raiffeisen Romania developer portal. Berlin Group PSD2 (Accounts, Payments, Funds Confirmation). Notable as the **only RO bank that launched with PIISP** (funds-confirmation) on day 1.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | unknown (`/v1/accounts`) | AISP |
| GET | unknown (`/v1/accounts/{id}/transactions`) | Transactions |
| POST | unknown (`/v1/payments/{product}`) | PISP |
| POST | unknown (`/v1/funds-confirmations`) | PIISP |

## Authentication

OAuth2 PSU consent + eIDAS QWAC mTLS.

## Request example

```bash
curl -X GET 'https://developer.raiffeisen.ro/.../v1/accounts' \
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

- [ ] Sandbox was at https://developer-test.raiffeisen.ro/ (host gone, see Known issues)
- [ ] Test QWAC required

## Known issues / gotchas

- **Portal host gone, no replacement found (2026-09-24):** `developer.raiffeisen.ro` and `developer-test.raiffeisen.ro` are still CNAMEs to `branding.developer.eu-de.apiconnect.ibmcloud.com`, which no longer resolves — the IBM API Connect portal behind them is gone. The only official page still up is the bank's 2019 announcement of the PSD2 test platform (now `official_docs`). No new RO developer-portal URL was found on raiffeisen.ro; TPPs should ask the bank directly. The group-level portal `api.rbinternational.com` answers, but it is not documented as covering Romania.
- Finqware 2024 benchmark — **3 of 16 RO bank PSD2 APIs broken in prod**
- Premium APIs under contract

## Tutorial seeds

- "PIISP funds-confirmation at Raiffeisen RO"
- "Connecting Raiffeisen accounts via AISP"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] OpenAPI mirror
- [ ] Wrapper + MCP tool

## References

- Official: https://developer.raiffeisen.ro/
- Berlin Group: https://www.berlin-group.org/nextgenpsd2-downloads
- Raiffeisen RO — PSD2 test platform announcement: https://www.raiffeisen.ro/ro/persoane-fizice/in-sprijinul-tau/informatii-utile/platforma-de-testare-a-serviciilor-de-plata.html
- Old portal (dead): https://developer.raiffeisen.ro/
- Last manual verification: 2026-05-27
