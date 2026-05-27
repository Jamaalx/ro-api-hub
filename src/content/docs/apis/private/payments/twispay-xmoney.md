---
slug: twispay-xmoney
title: Twispay / xMoney
category: payments
institution: Twispay (rebranded xMoney)
country: RO
status: active
verified_at: 2026-05-27
auth: api_key
protocol: REST/JSON
openapi_spec: partial
sandbox_available: true
contract_required: true
pricing: pay_as_you_go
rate_limit: unknown
official_docs: https://www.twispay.com/
api_base_url: unknown
last_known_version: "v1"
mandatory_for_business: false
---

# Twispay / xMoney

## Overview

Romanian-founded card processor rebranded as xMoney (with strong crypto-payments line) while retaining the Twispay brand for traditional card acquiring. Hosted-page and Server-to-Server APIs; recurring; multi-currency.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | unknown (`/order`) | Create order / hosted page |
| POST | unknown (`/order/recurring`) | Recurring charge |
| POST | unknown (IPN) | Notification callback |

## Authentication

Merchant API key + secret (HMAC signed payload). Sandbox merchant account on request.

## Request example

```bash
curl -X POST 'https://api.twispay.com/order' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <api_key>' \
  -d '{ "siteId": 123, "amount": 100, "currency": "RON", "orderId": "..." }'
```

## Response example

```json
{ "redirectUrl": "https://secure.twispay.com/...", "transactionId": "..." }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Multi | wallee processor docs reference Twispay | partner | Twispay as a wallee-supported processor |
| PHP | Magento / WooCommerce plugins | official-ish | Distributed by Twispay |

## Testing approach

- [x] Sandbox merchant account
- [ ] HMAC verification on IPN

## Known issues / gotchas

- Brand split (Twispay vs xMoney) makes docs confusing — same API surface
- Limited public SDK ecosystem
- Crypto and fiat flows share auth but have different webhook payloads

## Tutorial seeds

- "Twispay hosted page integration"
- "xMoney crypto payments vs Twispay fiat — choosing the right SDK"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] OpenAPI 3.1
- [ ] Wrapper + MCP tool
- [ ] Samples

## References

- Official: https://www.twispay.com/
- Last manual verification: 2026-05-27
