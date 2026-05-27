---
slug: anar-gis-portal
title: Apele Române (ANAR) GIS Portal
category: geo
institution: Administrația Națională "Apele Române" (ANAR)
country: RO
status: active
verified_at: 2026-05-27
auth: none
protocol: ArcGIS_REST
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: none_documented
official_docs: https://portal-gis.rowater.ro/
api_base_url: https://portal-gis.rowater.ro/
last_known_version: unknown
mandatory_for_business: false
---

# Apele Române (ANAR) GIS Portal

## Overview

ArcGIS-based GIS portal of the Romanian National Water Administration (ANAR / Apele Române). Publishes water-related layers: river basins, hydrographic network, flood-risk maps, water bodies, monitoring stations. ArcGIS REST endpoints back the portal and can be consumed programmatically.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://portal-gis.rowater.ro/` | Portal landing (ArcGIS Enterprise) |
| GET | `https://portal-gis.rowater.ro/server/rest/services/` | ArcGIS REST catalogue (typical path; verify) |

## Authentication

None for public services.

## Request example

```bash
curl -k 'https://portal-gis.rowater.ro/server/rest/services/?f=json'
```

(`-k` may be needed — see Known Issues.)

## Response example

Standard ArcGIS REST `f=json` catalogue.

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| JS | `@esri/arcgis-rest-request` | active | Generic |
| Python | `arcgis` (Esri) | active | Generic |

## Testing approach

- [x] Direct HTTP test (curl with `-k` to bypass TLS mismatch)
- [ ] Playwright needed for portal UI
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- **TLS certificate mismatch** observed 2026-05-27 — set `rejectUnauthorized: false` in Node, `verify=False` in Python (`requests`), or `-k` in curl. Track upstream fix and remove the bypass when resolved.
- ArcGIS REST root path may vary (`/arcgis/rest/...` vs `/server/rest/...`); confirm from the portal's network tab
- No published rate limit; throttle bulk crawls voluntarily

## Tutorial seeds (for content pipeline)

- "Mapping Romanian river basins from the ANAR GIS portal"
- "Handling TLS certificate mismatches when consuming Romanian gov APIs"

## ro-api-hub integration plan

- [ ] Catalogue entry with TLS warning
- [ ] Thin proxy that terminates TLS issues server-side
- [ ] MCP tool exposing layer discovery

## References

- Portal: https://portal-gis.rowater.ro/
- ANAR: https://rowater.ro/
- Last manual verification: 2026-05-27 (TLS mismatch confirmed)
