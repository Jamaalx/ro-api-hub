---
slug: euplatesc
title: EuPlatesc
category: payments
institution: EuPlatesc.ro (EuroPayment Services)
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: api_key
protocol: REST/JSON
openapi_spec: false
sandbox_available: true
contract_required: true
pricing: pay_as_you_go
rate_limit: unknown
official_docs: https://www.euplatesc.ro/
api_base_url: unknown
last_known_version: "v3 gateway"
mandatory_for_business: false
---

# EuPlatesc

## Overview

Long-running RO card-payment gateway. HTML form-post integration with HMAC-signed parameters (MID + secret key). No first-party OpenAPI spec — integration learned from PDF docs + community wrappers.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | unknown (`https://secure.euplatesc.ro/tdsprocess/tranzactd.php`) | Submit transaction (form post) |
| POST | unknown (back-office callback) | Server-to-server response (IPN) |

## Authentication

`MID` (merchant ID) + secret key. Each payload signed via HMAC (MD5/SHA over concatenated fields). Sandbox MID issued on request.

## Request example

```html
<form action="https://secure.euplatesc.ro/tdsprocess/tranzactd.php" method="POST">
  <input name="amount" value="100.00">
  <input name="curr" value="RON">
  <input name="invoice_id" value="ORDER-1">
  <input name="order_desc" value="Test">
  <input name="merch_id" value="...">
  <input name="timestamp" value="20260527120000">
  <input name="nonce" value="...">
  <input name="fp_hash" value="HMAC_MD5(...)">
</form>
```

## Response example

Posted back to the merchant callback URL as form fields including `fp_hash` to verify.

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| PHP | `vladutilie/euplatesc` | community | Popular Composer package |
| PHP | `vanilophp/euplatesc` | community | Vanilo e-commerce integration |
| PHP | WooCommerce plugin | official-ish | Distributed via euplatesc.ro |

## Testing approach

- [x] Sandbox MID
- [ ] Callback URL must be public
- [ ] Hash verification on response mandatory

## Known issues / gotchas

- No OpenAPI spec — fields documented in PDF + reverse-engineered from community libs
- HMAC field order matters; mistakes cause silent rejection
- 3DS2 flow added on top of legacy form-post — easy to misconfigure
- Documentation portal sometimes returns 403 to non-RO IPs

## Tutorial seeds

- "EuPlatesc HMAC signing without surprises (PHP/Node)"
- "EuPlatesc + Laravel via `vanilophp/euplatesc`"
- "Verifying EuPlatesc IPN callbacks"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] OpenAPI 3.1 (community-authored)
- [ ] Wrapper + MCP tool
- [ ] Samples

## References

- Official: https://www.euplatesc.ro/
- SDK: https://github.com/vladutilie/euplatesc
- SDK: https://github.com/vanilophp/euplatesc
- Last manual verification: 2026-05-27
