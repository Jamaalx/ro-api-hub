---
slug: innoship
title: Innoship Multi-Courier Orchestration API
category: couriers
institution: Innoship SRL
country: RO
status: active
verified_at: 2026-05-27
auth: api_key
protocol: REST/JSON
openapi_spec: true
sandbox_available: true
contract_required: true
pricing: subscription
rate_limit: unknown
official_docs: https://api.innoship.io/index.html
api_base_url: https://api.innoship.io
last_known_version: "v1"
mandatory_for_business: false
---

# Innoship Multi-Courier Orchestration API

## Overview

Innoship is a Romanian SaaS that aggregates 30+ couriers (Sameday, FAN, Cargus, DPD, GLS, UPS, DHL, etc.) behind a single REST API with live Swagger UI. Use it to compare rates, generate AWB on the cheapest/fastest courier, unified tracking, claims and analytics. Sandbox is included with every paid subscription.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `/api/auth/login` | Get API token |
| POST | `/api/shipments` | Create shipment (auto-rule routing) |
| GET | `/api/shipments/{id}/tracking` | Unified tracking |
| GET | `/api/couriers` | List enabled couriers |
| POST | `/api/rates` | Compare rates across couriers |
| POST | `/api/webhooks` | Register tracking webhook |

## Authentication

API key in `Authorization: Bearer <token>` header. Tokens are obtained from the Innoship admin UI or `/api/auth/login`.

## Request example

```bash
curl -X POST 'https://api.innoship.io/api/rates' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"weight":2,"originPostalCode":"540000","destinationPostalCode":"010101"}'
```

## Response example

```json
{ "rates": [ { "courier": "sameday", "price": 14.5, "etaDays": 2 } ] }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| No-code | Zapier / make.com | active | Official connectors |
| Multi | Shopify / Magento / WooCommerce | active | Official plugins |

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [x] Live Swagger UI at `https://api.innoship.io/index.html`
- [ ] Local simulator

## Known issues / gotchas

- Routing rules configured in Innoship UI override API hints.
- Per-courier credentials must be added in Innoship dashboard first.
- Webhook payload schema differs per courier; normalize on your side.
- Rate-card returns negotiated rates only after first 30 days of usage.

## Tutorial seeds (for content pipeline)

- "Choosing the cheapest courier per order with Innoship"
- "Building a unified tracking page (Innoship webhook → Supabase realtime)"
- "Migrating from single-courier integration to Innoship orchestration"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] Pull official OpenAPI from Swagger UI
- [ ] Thin REST wrapper (optional — Innoship is already a facade)
- [ ] MCP tool exposed via FastMCP
- [ ] Code samples (Node/Python/PHP)

## References

- Swagger UI: https://api.innoship.io/index.html
- Public site: https://innoship.io/
- Last manual verification: 2026-05-27
