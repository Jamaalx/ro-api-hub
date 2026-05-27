---
slug: fan-courier
title: FAN Courier API
category: couriers
institution: FAN Courier Express SRL
country: RO
status: active
verified_at: 2026-05-27
auth: basic_auth
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: true
pricing: enterprise
rate_limit: unknown
official_docs: https://www.fancourier.ro/
api_base_url: https://api.fancourier.ro
last_known_version: unknown
mandatory_for_business: false
---

# FAN Courier API

## Overview

REST API by FAN Courier, one of the top three RO national couriers. Used for AWB generation, pickup requests, tracking, tariff calculation, branch listing. Authentication is `username` + `password` + `client_id`. Official documentation is distributed as PDF on request + a community-maintained Markdown repo on GitHub.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `/login` | Authenticate, get token |
| POST | `/awb` | Generate AWB |
| GET | `/awb/{number}/track` | Track shipment |
| POST | `/tariff` | Calculate tariff |
| GET | `/locations` | Pickup branches |
| POST | `/pickup` | Request pickup |

## Authentication

POST credentials (`username`, `password`, `client_id`) to `/login`. Receive a token. Use as `Authorization: Bearer <token>` on subsequent calls.

## Request example

```bash
curl -X POST 'https://api.fancourier.ro/login' \
  -H 'Content-Type: application/json' \
  -d '{"username":"u","password":"p","client_id":"123"}'
```

## Response example

```json
{ "status": "success", "data": { "token": "eyJ..." } }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| PHP | `shusaura85/fancourier-api` | community | Packagist |
| Python | `fan-courier-client` | community | PyPI |
| Docs | `github.com/FAN-Courier/API-Docs` | semi-official | Markdown mirror |

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available (none public)
- [ ] Local simulator

## Known issues / gotchas

- No public sandbox; you must use prod credentials with test accounts.
- Tariffs differ per contract; results in `/tariff` reflect your negotiated rates.
- PDF docs lag behind actual fields returned.
- Webhook signing not documented.

## Tutorial seeds (for content pipeline)

- "Generating FAN Courier AWB in Laravel"
- "Calculating real-time shipping prices with FAN tariff API"
- "Migrating from FAN PDF docs to OpenAPI spec"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (community-built)
- [ ] Thin REST wrapper
- [ ] MCP tool exposed via FastMCP
- [ ] Code samples (Node/Python/PHP)

## References

- Official site: https://www.fancourier.ro/
- Community docs: https://github.com/FAN-Courier/API-Docs
- PHP wrapper: https://github.com/shusaura85/fancourier-api
- Last manual verification: 2026-05-27
