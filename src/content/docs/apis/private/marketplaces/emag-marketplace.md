---
slug: emag-marketplace
title: eMAG Marketplace API
category: marketplaces
institution: Dante International SA (eMAG)
country: RO
status: active
verified_at: 2026-05-27
auth: basic_auth
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: true
pricing: enterprise
rate_limit: "3 req/s (documented)"
official_docs: https://marketplace.emag.ro/documentation/api/external
api_base_url: https://marketplace-api.emag.ro/api-3
last_known_version: "v4.4"
mandatory_for_business: false
---

# eMAG Marketplace API

## Overview

The eMAG Marketplace API (v4.4) is the integration surface for sellers on Romania's largest e-commerce platform (also active in BG, HU, PL). It covers product offer management, stock & price sync, order ingestion, AWB generation via eMAG-contracted couriers, returns (RMA), invoices and Genius / financing flags. Authentication is HTTP Basic; credentials are tied to a seller account and country (RO, BG, HU, PL endpoints differ).

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `/product_offer/read` | Read offers |
| POST | `/product_offer/save` | Create/update offer |
| POST | `/offer/stock` | Stock update |
| POST | `/order/read` | List orders |
| POST | `/order/acknowledge` | Ack order |
| POST | `/awb/save` | Generate AWB |
| POST | `/rma/save` | Update return |

## Authentication

HTTP Basic with seller account `username:password` Base64 in the `Authorization` header. Country-specific URLs (`marketplace-api.emag.ro`, `marketplace-api.emag.bg`, etc.).

## Request example

```bash
curl -X POST 'https://marketplace-api.emag.ro/api-3/order/read' \
  -u 'user:pass' \
  -H 'Content-Type: application/json' \
  -d '{"status":1,"itemsPerPage":100,"currentPage":1}'
```

## Response example

```json
{ "isError": false, "results": [ { "id": 123456, "status": 1 } ] }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| PHP | community wrappers | active | Several on Packagist |
| Multi | Channable / Lengow / BaseLinker | commercial | Multi-marketplace |
| Node | none official | — | Build from docs |

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available — no, must use real seller account
- [ ] Local simulator

## Known issues / gotchas

- Rate limit ~3 req/s — burst control mandatory.
- All endpoints are POST; reads have body filters.
- Offers may take minutes to propagate to PDP.
- `isError:true` payloads still return HTTP 200 — check JSON.
- Country-specific schemas have small differences (vat rates, allowed categories).

## Tutorial seeds (for content pipeline)

- "eMAG Marketplace integration in Next.js — order webhook to Supabase"
- "Stock sync across eMAG RO/BG/HU/PL from one ERP"
- "Auto-generating AWB on eMAG order acknowledge"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (community-built from PDF)
- [ ] Thin REST wrapper (multi-country)
- [ ] MCP tool exposed via FastMCP
- [ ] Code samples (Node/Python/PHP)

## References

- Official docs: https://marketplace.emag.ro/documentation/api/external
- Seller portal: https://marketplace.emag.ro/
- Last manual verification: 2026-05-27
