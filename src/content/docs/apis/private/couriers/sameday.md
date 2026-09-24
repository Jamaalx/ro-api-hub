---
slug: sameday
title: Sameday Courier API (incl. easybox Locker SDK)
category: couriers
institution: Sameday Courier SRL (eMAG group)
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: basic_auth
protocol: REST/JSON
openapi_spec: false
sandbox_available: true
contract_required: true
pricing: enterprise
rate_limit: unknown
official_docs: https://github.com/sameday-courier/php-sdk
api_base_url: https://api.sameday.ro
last_known_version: "v1"
mandatory_for_business: false
---

# Sameday Courier API

## Overview

REST API by Sameday (largest Romanian last-mile courier, eMAG group) for creating AWBs, requesting pickups, tracking parcels and listing the ~5000+ easybox lockers. A separate JS Locker Plugin SDK lets e-commerce sites embed a locker-picker map. Production access requires a courier contract; the demo environment (`sameday-api.demo.zitec.com`) is open for testing.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `/api/authenticate` | Login (returns Bearer token) |
| POST | `/api/awb` | Create AWB |
| GET | `/api/awb/{awb}/status/sync` | Track AWB (sync) |
| GET | `/api/client/lockers` | List easybox lockers |
| POST | `/api/awb/{awb}/cancel` | Cancel AWB |
| POST | `/api/awb/estimate-cost` | Estimate shipping cost |

## Authentication

HTTP headers `X-Auth-Username` + `X-Auth-Password` on `/api/authenticate`. Returns a token to be sent in `X-Auth-Token` on subsequent calls. Tokens are short-lived; re-authenticate on 401.

## Request example

```bash
curl -X POST 'https://api.sameday.ro/api/authenticate' \
  -H 'X-Auth-Username: your_user' \
  -H 'X-Auth-Password: your_pass'
```

## Response example

```json
{ "token": "eyJ0eXAi...", "expireAt": "2026-05-27T12:00:00+00:00" }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| PHP | `sameday-courier/php-sdk` | official | github.com/sameday-courier |
| PHP | WooCommerce / Magento / PrestaShop / OpenCart plugins | official | github.com/sameday-courier |
| JS | `cdn.sameday.ro/locker-plugin/` | official | Frontend locker picker only |

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [x] Sandbox available at `https://sameday-api.demo.zitec.com`
- [ ] Local simulator

## Known issues / gotchas

- **Docs behind HTTP Basic auth (2026-09-24):** `sameday-api.demo.zitec.com/documentation/client` answers 401 (`WWW-Authenticate: Basic`) to everyone, not just robots — you need credentials from Sameday. `official_docs` now points to Sameday's public, actively maintained PHP SDK (`docs/` folder; last push 2026-08), which documents the same API and the demo host.
- Token endpoint differs between demo and prod (`api.sameday.ro` vs `sameday-api.demo.zitec.com`).
- Pickup point IDs must be created in client portal first.
- Locker list is large (~5k); cache locally for client-side widgets.
- Status webhook requires whitelisting your callback URL by Sameday support.

## Tutorial seeds (for content pipeline)

- "How to generate a Sameday AWB in Node.js"
- "Embedding the easybox locker picker on a Next.js checkout"
- "Caching Sameday locker list nightly in Supabase"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (reverse-engineered from PDF)
- [ ] Thin REST wrapper
- [ ] MCP tool exposed via FastMCP
- [ ] Code samples (Node/Python/PHP)

## References

- Official PHP SDK + docs: https://github.com/sameday-courier/php-sdk (org `sameday-courier`, contact software@sameday.ro)
- Demo API docs (HTTP Basic, needs Sameday credentials): https://sameday-api.demo.zitec.com/documentation/client
- Locker SDK: https://cdn.sameday.ro/locker-plugin/techdoc.html
- GitHub org: https://github.com/sameday-courier
- Last manual verification: 2026-05-27
