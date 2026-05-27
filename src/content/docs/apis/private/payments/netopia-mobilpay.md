---
slug: netopia-mobilpay
title: NETOPIA Payments (mobilPay)
category: payments
institution: NETOPIA Financial Services S.A.
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
official_docs: https://doc.netopia-payments.com/
api_base_url: unknown
last_known_version: "v2 (NETOPIA Payments API)"
mandatory_for_business: false
---

# NETOPIA Payments (mobilPay)

## Overview

Largest Romanian online payment processor (formerly mobilPay). Card, Apple Pay, Google Pay, BNPL, SEPA DD, BT24 link, recurring. Active first-party SDK suite on GitHub covering PHP, Node, plus plugins for Magento, PrestaShop, WooCommerce, OpenCart.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | unknown (Payments API `/payment/card/start`) | Start card payment |
| POST | unknown (`/payment/card/recurring`) | Recurring charge |
| POST | unknown (IPN/notify callback) | Server-to-server notification |

## Authentication

Merchant API key (signature key) per merchant account. Legacy mobilPay used signed XML payloads; new NETOPIA Payments API uses JSON + signature headers. Sandbox merchant account issued after KYC.

## Request example

```bash
curl -X POST 'https://secure.mobilpay.ro/.../payment/card/start' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <merchant_api_key>' \
  -d '{ "orderID": "...", "amount": 100, "currency": "RON" }'
```

## Response example

```json
{ "paymentURL": "https://secure.mobilpay.ro/...", "ntpID": "..." }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| PHP | `mobilpay/PHP-Payment-Gateway` | official | Legacy mobilPay XML SDK |
| Node | `github.com/mobilpay/Node-Payment-Gateway` | official | |
| PHP | NETOPIA WooCommerce/Magento/PrestaShop plugins | official | github.com/mobilpay |
| Node | NETOPIA Payments API client | official | New JSON API |

## Testing approach

- [x] Sandbox merchant account
- [ ] IPN endpoint must be publicly reachable (ngrok in dev)
- [ ] Signature verification mandatory on callbacks

## Known issues / gotchas

- Two parallel APIs: legacy mobilPay (XML+RSA) vs new NETOPIA Payments (JSON) — docs sometimes mix them
- IPN retries: idempotency keys recommended
- Recurring requires extra contract clause
- 3DS challenge handling differs across card schemes

## Tutorial seeds

- "Migrating from mobilPay legacy XML to NETOPIA Payments JSON"
- "Handling NETOPIA IPN safely with signature verification"
- "Setting up recurring billing with NETOPIA"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] OpenAPI 3.1 (transcribed)
- [ ] Wrapper + MCP tool
- [ ] Samples in PHP/Node/Python

## References

- Official: https://doc.netopia-payments.com/
- SDKs: https://github.com/mobilpay
- Last manual verification: 2026-05-27
