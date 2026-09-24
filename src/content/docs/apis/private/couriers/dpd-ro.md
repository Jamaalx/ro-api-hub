---
slug: dpd-ro
title: DPD Romania API
category: couriers
institution: DPD Romania SRL (Geopost group)
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: basic_auth
protocol: REST/JSON
openapi_spec: true
sandbox_available: true
contract_required: true
pricing: enterprise
rate_limit: unknown
official_docs: https://api.dpd.ro/api/docs/
api_base_url: https://api.dpd.ro
last_known_version: unknown
mandatory_for_business: false
---

# DPD Romania API

## Overview

DPD Romania (Geopost / La Poste group) publishes a full Swagger UI for its REST API covering AWB creation, pickup, tracking, pricing, parcelshop directory and label PDF rendering. Authentication uses the client's web account credentials. The same endpoints serve both production and test data depending on the client account flag.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `/services/shipment/createShipment.json` | Create shipment / AWB |
| POST | `/services/shipment/cancelShipment.json` | Cancel shipment |
| POST | `/services/track/.json` | Track parcel |
| POST | `/services/shipment/calculate.json` | Price calc |
| POST | `/services/location/office/.json` | List parcelshops/offices |

## Authentication

Each POST body contains a `userName` + `password` block (client web account). HTTPS required. No OAuth; rotate credentials manually in client portal.

## Request example

```bash
curl -X POST 'https://api.dpd.ro/services/track/.json' \
  -H 'Content-Type: application/json' \
  -d '{"userName":"u","password":"p","parcels":[{"id":"123456789"}]}'
```

## Response example

```json
{ "parcels": [ { "id": "123456789", "operations": [ ... ] } ] }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Multi | ShipEngine connector | commercial | DPD RO supported |
| Multi | Cargoson connector | commercial | Multi-courier SaaS |
| PHP | community Gists | unofficial | Not on Packagist |

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [x] Swagger UI at `https://api.dpd.ro/api/docs/`
- [ ] Local simulator

## Known issues / gotchas

- All endpoints are POST (even reads).
- Test/prod toggle controlled server-side per account, not in URL.
- Label PDFs returned as base64 inside JSON — large payloads.
- Tracking events vary by parcelshop vs door-to-door.

## Tutorial seeds (for content pipeline)

- "DPD RO tracking webhook with Next.js route handlers"
- "Printing DPD labels server-side (base64 PDF → buffer)"
- "Building a multi-courier label printer (DPD + FAN + Sameday)"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (export from Swagger UI)
- [ ] Thin REST wrapper
- [ ] MCP tool exposed via FastMCP
- [ ] Code samples (Node/Python/PHP)

## References

- Swagger: https://api.dpd.ro/api/docs/
- Public site: https://www.dpd.com/ro/
- Last manual verification: 2026-05-27
