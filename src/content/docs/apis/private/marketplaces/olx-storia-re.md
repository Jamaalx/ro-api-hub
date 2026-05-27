---
slug: olx-storia-re
title: OLX Group Real Estate API (Storia.ro)
category: marketplaces
institution: OLX Group (Prosus / Naspers)
country: RO
status: active
verified_at: 2026-05-27
auth: oauth2
protocol: REST/JSON
openapi_spec: true
sandbox_available: true
contract_required: true
pricing: enterprise
rate_limit: unknown
official_docs: https://developer.olxgroup.com/
api_base_url: https://api.olxgroup.com
last_known_version: unknown
mandatory_for_business: false
---

# OLX Group Real Estate API (Storia.ro)

## Overview

OLX Group's Real Estate APIs power Storia.ro (RO real-estate vertical) and sister brands (Otodom PL, Imovirtual PT, Imobiliare RO via partners). Uses OAuth2 client-credentials & authorization-code flows. Documentation served by ReadMe.com with interactive Swagger. Endpoints cover listings CRUD, packages, leads, image upload and bulk imports for agencies.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `/oauth/token` | OAuth2 token |
| GET | `/api/partner/adverts` | List your listings |
| POST | `/api/partner/adverts` | Create listing |
| PUT | `/api/partner/adverts/{id}` | Update listing |
| POST | `/api/partner/adverts/{id}/images` | Upload image |
| GET | `/api/partner/leads` | Fetch buyer leads |

## Authentication

OAuth2. Register at developer.olxgroup.com, get `client_id`/`client_secret`. Two flows:
- `client_credentials` for server-to-server agency integrations.
- `authorization_code` for apps acting on behalf of an OLX user.

## Request example

```bash
curl -X POST 'https://api.olxgroup.com/oauth/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=client_credentials&client_id=...&client_secret=...&scope=read+write'
```

## Response example

```json
{ "access_token": "eyJ...", "token_type": "Bearer", "expires_in": 3600 }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Multi | ReadMe-generated snippets | partial | Auto from spec |
| RE | CRM connectors (Real Smart, Endpoint) | commercial | Integrators |

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [x] Sandbox available (per-partner credentials)
- [ ] Local simulator

## Known issues / gotchas

- Country-specific country codes (RO, PL, PT, etc.) gate endpoints.
- Image upload uses multipart; max 25 images per ad.
- Lead webhook requires partner registration.
- Storia.ro and OLX RO classifieds are SEPARATE products — this API doesn't cover OLX general classifieds.

## Tutorial seeds (for content pipeline)

- "Bulk-import 1000 RE listings to Storia.ro from a CSV"
- "Receiving Storia leads in a Next.js webhook and pushing to CRM"
- "OAuth2 setup for OLX Group Real Estate API"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (export from ReadMe)
- [ ] Thin REST wrapper
- [ ] MCP tool exposed via FastMCP
- [ ] Code samples (Node/Python/PHP)

## References

- Developer portal: https://developer.olxgroup.com/
- Storia.ro: https://www.storia.ro/
- Last manual verification: 2026-05-27
