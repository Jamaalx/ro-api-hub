---
slug: plationline
title: PlatiOnline.eu
category: payments
institution: PlatiOnline (PayU-independent RO PSP)
country: RO
status: active
verified_at: 2026-05-27
auth: api_key
protocol: REST/XML
openapi_spec: false
sandbox_available: true
contract_required: true
pricing: pay_as_you_go
rate_limit: unknown
official_docs: https://plationline.eu/
api_base_url: unknown
last_known_version: "PO v4"
mandatory_for_business: false
---

# PlatiOnline.eu

## Overview

Veteran RO card payment processor. Integration via signed request blobs (Merchant ID + key) posted from the merchant site to the PlatiOnline gateway. Plugins exist for PrestaShop and Magento; no first-party OpenAPI spec.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | unknown (gateway entrypoint) | Submit signed transaction request |
| POST | unknown (IPN) | Server-to-server response |

## Authentication

Merchant ID + secret key, payload signed/encrypted per PlatiOnline's spec.

## Request example

```bash
# Typical pattern: POST signed XML/JSON to gateway URL
curl -X POST 'https://...plationline.../gateway' \
  -H 'Content-Type: application/xml' \
  -d '<request>...</request>'
```

## Response example

```xml
<response><status>OK</status><poTID>...</poTID></response>
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| PHP | PrestaShop module | official | Distributed by PlatiOnline |
| PHP | Magento module | official | |

## Testing approach

- [x] Sandbox merchant account
- [ ] IPN callback must be public

## Known issues / gotchas

- No public OpenAPI; spec ships as PDF
- XML-heavy integration — modern JSON-first stacks need a wrapper
- Smaller market share — limited community help

## Tutorial seeds

- "PlatiOnline integration without their PrestaShop module"
- "Wrapping PlatiOnline XML in a JSON REST facade"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] OpenAPI 3.1 (community-authored)
- [ ] JSON wrapper + MCP tool

## References

- Official: https://plationline.eu/
- Last manual verification: 2026-05-27
