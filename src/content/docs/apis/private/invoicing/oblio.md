---
slug: oblio
title: Oblio Invoicing API
category: invoicing
institution: Oblio Software SRL
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: api_key
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: subscription
rate_limit: unknown
official_docs: https://www.oblio.eu/api
api_base_url: https://www.oblio.eu/api
last_known_version: unknown
mandatory_for_business: false
---

# Oblio Invoicing API

## Overview

Oblio is a Romanian invoicing SaaS aimed at SMEs and freelancers (PFA/SRL). REST API covers invoice / proforma / receipt / notice CRUD, stock, e-Factura ANAF sync (mandatory B2B since 2024), products, clients and series. Official PHP SDK + WooCommerce plugin. Cleanest API in the RO invoicing space.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `/authorize/token` | Get access token |
| POST | `/docs/invoice` | Create invoice |
| GET | `/docs/invoice?cif=...&seriesName=...&number=...` | Fetch invoice |
| DELETE | `/docs/invoice` | Cancel invoice |
| POST | `/docs/proforma` | Create proforma |
| POST | `/docs/notice` | Create receipt |
| POST | `/docs/efactura` | e-Factura ANAF upload |

## Authentication

OAuth2-like: POST `client_id` (email) + `client_secret` (API secret from Oblio admin) to `/authorize/token`, get Bearer token (~1h). Pass as `Authorization: Bearer ...`.

## Request example

```bash
curl -X POST 'https://www.oblio.eu/api/authorize/token' \
  -H 'Content-Type: application/json' \
  -d '{"client_id":"office@example.ro","client_secret":"..."}'
```

## Response example

```json
{ "access_token": "eyJ...", "token_type": "Bearer", "expires_in": 3600 }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| PHP | `OblioSoftware/oblio-api-php` | official | GitHub |
| WP | Oblio WooCommerce | official | Plugin |
| No-code | Zapier / make.com | active | Connectors |

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available — use Oblio trial account
- [ ] Local simulator

## Known issues / gotchas

- Access token expires every hour — cache & refresh.
- Series names case-sensitive.
- PDF link returned in response, valid for ~24h, then needs regeneration.
- e-Factura ANAF endpoint is async; poll for status.

## Tutorial seeds (for content pipeline)

- "Issuing Oblio invoice from Shopify order webhook"
- "Migrating from Facturis to Oblio with the API"
- "Comparing Oblio vs SmartBill API ergonomics"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (community-built)
- [ ] Thin REST wrapper
- [ ] MCP tool exposed via FastMCP
- [ ] Code samples (Node/Python/PHP)

## References

- Official docs: https://www.oblio.eu/api
- PHP SDK: https://github.com/OblioSoftware/oblio-api-php
- Last manual verification: 2026-05-27
