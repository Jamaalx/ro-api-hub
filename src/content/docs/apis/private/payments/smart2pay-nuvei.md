---
slug: smart2pay-nuvei
title: Smart2Pay / Nuvei APM Gateway
category: payments
institution: Nuvei Corporation (acquired Smart2Pay 2021)
country: RO
status: active
verified_at: 2026-05-27
auth: api_key
protocol: REST/JSON
openapi_spec: true
sandbox_available: true
contract_required: true
pricing: pay_as_you_go
rate_limit: unknown
official_docs: https://docs-apm.nuvei.com/
api_base_url: unknown
last_known_version: "Nuvei APM v1"
mandatory_for_business: false
---

# Smart2Pay / Nuvei APM Gateway

## Overview

Smart2Pay was a Romanian/Dutch alternative-payment-methods aggregator (200+ APMs across 100+ countries), acquired by Nuvei in 2021. The platform now lives under `docs-apm.nuvei.com` (APM = Alternative Payment Methods) and retains the Smart2Pay SDKs on GitHub.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | unknown (`/v1/payments`) | Initiate APM payment |
| POST | unknown (`/v1/refunds`) | Refund |
| POST | unknown (webhook) | Status callback |

## Authentication

API key (HMAC signed requests). Sandbox merchant account provisioned by Nuvei.

## Request example

```bash
curl -X POST 'https://apitest.smart2pay.com/v1/payments' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Basic <base64(siteId:apiKey)>' \
  -d '{ "Payment": { "MerchantTransactionID": "...", "Amount": 100, "Currency": "RON", "MethodID": 1 } }'
```

## Response example

```json
{ "Payment": { "ID": 12345, "Status": { "ID": 1, "Info": "Open" }, "RedirectURL": "https://..." } }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| PHP | `Smart2Pay/SDK-PHP` | official | github.com/Smart2Pay |
| iOS | Smart2Pay mobile SDK | official | |
| Android | Smart2Pay mobile SDK | official | |

## Testing approach

- [x] Sandbox at `apitest.smart2pay.com`
- [ ] Webhook URL must be public
- [ ] HMAC signature verification

## Known issues / gotchas

- Two doc surfaces: legacy Smart2Pay + new Nuvei portal — pick one
- APM availability varies per merchant agreement
- Some methods require additional KYC

## Tutorial seeds

- "Adding RO local APMs (e.g., Garanti BBVA Bonus) via Nuvei"
- "Migrating from Smart2Pay legacy to Nuvei APM docs"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] OpenAPI 3.1 mirror
- [ ] Wrapper + MCP tool

## References

- Official: https://docs-apm.nuvei.com/
- SDKs: https://github.com/Smart2Pay
- Last manual verification: 2026-05-27
