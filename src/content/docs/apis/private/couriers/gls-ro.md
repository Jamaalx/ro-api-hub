---
slug: gls-ro
title: GLS Romania MyGLS API
category: couriers
institution: General Logistics Systems Romania SRL
country: RO
status: active
verified_at: 2026-05-27
auth: api_key
protocol: REST/JSON
openapi_spec: false
sandbox_available: true
contract_required: true
pricing: enterprise
rate_limit: unknown
official_docs: https://mygls.ro/
api_base_url: https://api.mygls.ro
last_known_version: unknown
mandatory_for_business: false
---

# GLS Romania MyGLS API

## Overview

The MyGLS API by GLS Romania (GLS Group, Royal Mail) handles parcel creation, pickup, tracking, label rendering and ParcelShop directory queries. Documentation is gated behind a MyGLS client account — no public PDF/Swagger. Credentials are issued together with the courier contract.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `/ParcelService.svc/json/PrintLabels` | Create + print labels |
| POST | `/ParcelService.svc/json/GetParcelStatuses` | Tracking |
| POST | `/ParcelService.svc/json/GetParcelList` | List parcels |
| POST | `/ParcelService.svc/json/DeleteLabels` | Cancel labels |

## Authentication

Each request body contains `Username` + `Password` (or hashed `Password` per docs) and a `ClientNumber`. HTTPS required.

## Request example

```bash
curl -X POST 'https://api.mygls.ro/ParcelService.svc/json/GetParcelStatuses' \
  -H 'Content-Type: application/json' \
  -d '{"Username":"u","Password":[1,2,3],"ParcelNumber":"123456789"}'
```

## Response example

```json
{ "ParcelStatusList": [ { "StatusCode": 1, "StatusDescription": "Picked up" } ] }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| PHP | community WooCommerce plugins | unofficial | Several on WPMU |
| PHP | community Magento extensions | unofficial | — |
| Node | none official | — | Build via REST |

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [x] Sandbox available (test client number on request)
- [ ] Local simulator

## Known issues / gotchas

- Password sent as SHA-512 byte array, not plain string — easy to misformat.
- WCF-style JSON endpoints (`.svc/json/...`) — different from typical REST.
- Label format: base64 PDF inside JSON.
- ParcelShop listing requires separate endpoint with country filter.

## Tutorial seeds (for content pipeline)

- "Hashing the MyGLS password correctly in Node.js"
- "Printing GLS labels in a Next.js admin page"
- "ParcelShop picker for GLS Romania checkout"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (reverse-engineered)
- [ ] Thin REST wrapper
- [ ] MCP tool exposed via FastMCP
- [ ] Code samples (Node/Python/PHP)

## References

- Public site: https://gls-group.com/RO/ro/
- MyGLS portal: https://mygls.ro/
- Last manual verification: 2026-05-27
