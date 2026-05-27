---
slug: cargus
title: Urgent Cargus API
category: couriers
institution: Urgent Cargus SA
country: RO
status: active
verified_at: 2026-05-27
auth: api_key
protocol: REST/JSON
openapi_spec: true
sandbox_available: false
contract_required: true
pricing: enterprise
rate_limit: unknown
official_docs: https://urgentcargus.portal.azure-api.net
api_base_url: https://urgentcargus.azure-api.net
last_known_version: "v1"
mandatory_for_business: false
---

# Urgent Cargus API

## Overview

Cargus's API is hosted on Azure API Management with an auto-generated developer portal. It exposes endpoints for AWB management, tracking, pickup, tariff calculation and pickup-location maintenance. Subscription keys are issued from the Azure portal after a courier contract is signed.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `/api/LoginUser` | Login, returns Bearer token |
| GET | `/api/PickupLocations` | List pickup points |
| POST | `/api/Awbs` | Create AWB |
| GET | `/api/AwbTrace?barCode={awb}` | Tracking |
| POST | `/api/ShippingCalculation` | Estimate cost |

## Authentication

Two layers: (1) Azure APIM `Ocp-Apim-Subscription-Key` header for every request; (2) Bearer token obtained from `/api/LoginUser` with body `{ "UserName": ..., "Password": ... }`.

## Request example

```bash
curl -X POST 'https://urgentcargus.azure-api.net/api/LoginUser' \
  -H 'Ocp-Apim-Subscription-Key: <key>' \
  -H 'Content-Type: application/json' \
  -d '{"UserName":"u","Password":"p"}'
```

## Response example

```json
"eyJhbGciOiJIUzI1NiIs..."
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| No-code | make.com app | active | Direct connector |
| PHP/Node | none official | — | Community Gists only |

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- Two-factor auth (subscription key + bearer) — easy to forget the key on retries.
- AWB body is verbose; expects "Parcels" array with weights/dimensions.
- Azure APIM returns 401 with no body on bad subscription key.
- Pickup-location IDs must be created in client portal first.

## Tutorial seeds (for content pipeline)

- "Calling Cargus through Azure APIM subscription keys"
- "Generating AWB Cargus with Node.js and Zod validation"
- "Building a multi-courier picker (Cargus + Sameday + FAN)"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (pull from Azure APIM portal)
- [ ] Thin REST wrapper
- [ ] MCP tool exposed via FastMCP
- [ ] Code samples (Node/Python/PHP)

## References

- Azure APIM portal: https://urgentcargus.portal.azure-api.net
- Public website: https://www.cargus.ro/
- Last manual verification: 2026-05-27
