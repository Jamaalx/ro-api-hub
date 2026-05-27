---
slug: facturis-online
title: Facturis Online API
category: invoicing
institution: Facturis SRL
country: RO
status: active
verified_at: 2026-05-27
auth: api_key
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: subscription
rate_limit: unknown
official_docs: https://www.facturis.ro/
api_base_url: https://www.facturis.ro/api
last_known_version: unknown
mandatory_for_business: false
---

# Facturis Online API

## Overview

Facturis Online is a Romanian invoicing SaaS (also has a desktop sibling, Facturis Desktop). The cloud edition exposes a REST API for invoice/proforma/receipt creation, e-Factura ANAF upload, stock, clients and partners. API access tier varies by subscription.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `/login` | Authenticate, get key/token |
| POST | `/invoice` | Create invoice |
| GET | `/invoice/{id}` | Read invoice |
| POST | `/efactura/upload` | e-Factura ANAF |
| POST | `/clients` | Create client |
| GET | `/products` | List products |

## Authentication

API key issued in Facturis admin. Pass as `Authorization: Bearer <key>` or `X-API-Key` header (per docs in admin).

## Request example

```bash
curl -X POST 'https://www.facturis.ro/api/invoice' \
  -H 'X-API-Key: <key>' \
  -H 'Content-Type: application/json' \
  -d '{"client":{"cui":"RO43990858"},"items":[...]}'
```

## Response example

```json
{ "id": 123, "series": "FACT", "number": "0001", "pdf_url": "https://..." }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| WP | Facturis WooCommerce plugin | official | Marketplace |
| PHP/Node | none widely used | — | Build from docs |

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- API docs distributed primarily via admin panel — gated to clients.
- Smaller community than SmartBill / Oblio.
- Some endpoints differ between Online and Desktop editions.
- e-Factura ANAF upload requires SPV link in admin.

## Tutorial seeds (for content pipeline)

- "Migrating from Facturis Desktop to Facturis Online via API"
- "Issuing Facturis invoices from a Next.js storefront"
- "Comparing Facturis Online vs SmartBill vs Oblio for SMEs"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (community-built)
- [ ] Thin REST wrapper
- [ ] MCP tool exposed via FastMCP
- [ ] Code samples (Node/Python/PHP)

## References

- Official site: https://www.facturis.ro/
- Last manual verification: 2026-05-27
