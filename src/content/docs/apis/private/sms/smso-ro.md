---
slug: smso-ro
title: SMSO.ro Bulk SMS API
category: sms
institution: SMSO SRL
country: RO
status: active
verified_at: 2026-05-27
auth: api_key
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: pay_as_you_go
rate_limit: unknown
official_docs: https://www.smso.ro/produse/
api_base_url: https://app.smso.ro/api
last_known_version: "v1"
mandatory_for_business: false
---

# SMSO.ro Bulk SMS API

## Overview

SMSO.ro is a Romanian bulk SMS provider with REST and SMPP gateways for marketing, transactional and OTP messages. Supports custom sender ID (alphanumeric), delivery reports, scheduled batches and HLR lookup. Authentication is per-account API key. Pricing is pay-per-message in RO and international.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `/send` | Send SMS to one or more numbers |
| GET | `/status/{id}` | Delivery status by message id |
| GET | `/balance` | Account balance |
| POST | `/schedule` | Schedule send |
| GET | `/dlr` | Delivery report list |

## Authentication

`Authorization: Bearer <api_key>` header. API key generated in SMSO dashboard.

## Request example

```bash
curl -X POST 'https://app.smso.ro/api/send' \
  -H 'Authorization: Bearer <key>' \
  -H 'Content-Type: application/json' \
  -d '{"to":"+40712345678","message":"Cod OTP: 1234","sender":"ZEDZEN"}'
```

## Response example

```json
{ "status": "ok", "id": "msg_abc123", "parts": 1 }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Multi | Zapier / make.com | active | Connectors |
| WP | WooCommerce SMS plugin | active | Order notifications |
| Node/PHP | none official | — | Build from docs |

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available — no public sandbox; use small balance for test
- [ ] Local simulator

## Known issues / gotchas

- Alphanumeric sender ID needs prior approval from operators (~24–72h).
- Long messages auto-split into 70/153 char parts — billed per part.
- DLR callbacks require whitelisted webhook URL.
- HLR lookup priced separately.

## Tutorial seeds (for content pipeline)

- "Sending OTP SMS in Next.js with SMSO.ro"
- "Bulk marketing campaigns with scheduled SMSO sends"
- "GDPR-compliant consent flow for SMS marketing in RO"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (community-built)
- [ ] Thin REST wrapper
- [ ] MCP tool exposed via FastMCP
- [ ] Code samples (Node/Python/PHP)

## References

- Official site: https://www.smso.ro/produse/
- App: https://app.smso.ro/
- Last manual verification: 2026-05-27
