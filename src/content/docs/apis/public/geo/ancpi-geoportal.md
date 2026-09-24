---
slug: ancpi-geoportal
title: ANCPI Geoportal (ArcGIS REST)
category: geo
institution: Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI)
country: RO
status: suspended
verified_at: 2026-05-27
auth: none
protocol: ArcGIS_REST
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: none_documented
official_docs: https://geoportal.ancpi.ro/
api_base_url: https://geoportal.ancpi.ro/arcgis/rest/services/
last_known_version: unknown
mandatory_for_business: false
---

# ANCPI Geoportal (ArcGIS REST)

## Overview

Official geoportal of the Romanian National Agency for Cadastre and Real-Estate Publicity (ANCPI). Exposes cadastral and topographic layers (UAT boundaries, parcels, ortofoto, etc.) as ArcGIS REST services. The HTML viewer is JS-rendered, but the underlying ArcGIS REST endpoints return JSON/GeoJSON and can be consumed directly.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://geoportal.ancpi.ro/arcgis/rest/services/` | Service catalogue (root) |
| GET | `https://geoportal.ancpi.ro/arcgis/rest/services/{folder}/{service}/MapServer` | Layer metadata |
| GET | `https://geoportal.ancpi.ro/arcgis/rest/services/{folder}/{service}/MapServer/{layerId}/query?where=...&outFields=*&f=geojson` | Feature query |

## Authentication

None for public layers. Some restricted services may require an internal ANCPI account.

## Request example

```bash
curl 'https://geoportal.ancpi.ro/arcgis/rest/services/?f=json'
```

## Response example

```json
{ "currentVersion": 10.x, "folders": ["..."], "services": [ { "name": "...", "type": "MapServer" } ] }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| JS | `@esri/arcgis-rest-request` | active | Generic ArcGIS REST client works |
| Python | `arcgis` (Esri) | active | Esri's official Python API |

## Testing approach

- [x] Direct HTTP test (curl / fetch) against `/arcgis/rest/services/?f=json`
- [x] Playwright needed for the HTML viewer (JS-rendered)
- [ ] Browser UA spoof needed (WAF returned empty body on default UA in verification)
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- **Offline after the ANCPI ransomware attack (2026-09-24):** ANCPI's IT infrastructure was hit by ransomware on 2026-07-14. As of 2026-08-20 only e-Terra was restarted; ANCPI states that RTI, MyEterra, Registrul proprietarilor, Titluri de proprietate **and Geoportal** will be brought back in stages and each restart announced publicly. `geoportal.ancpi.ro` is NXDOMAIN (checked 2026-09-24). No alternative URL. When it returns, the INSPIRE view services were under `/inspireview/rest/services` as well as `/arcgis/rest/services`.
- The HTML viewer is JS-rendered; WebFetch returned empty content in the 2026-05-27 sweep — use Playwright if scraping the UI
- Layer IDs and folder names are not documented in one place; you must crawl the `/services/` catalogue
- Some `MapServer` services may have `maxRecordCount` limits (commonly 1000) — paginate via `resultOffset`/`resultRecordCount`
- No documented rate limit, but rapid bulk queries are unwise

## Tutorial seeds (for content pipeline)

- "Querying ANCPI cadastral parcels from Node.js with @esri/arcgis-rest-request"
- "Bulk-exporting UAT boundaries from ANCPI Geoportal to GeoJSON"
- "Caching ArcGIS REST tiles with Cloudflare Workers"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (translated from ArcGIS REST schema)
- [ ] Thin REST wrapper exposing simplified `/parcels?lat=&lon=` endpoint
- [ ] MCP tool exposed via FastMCP
- [ ] Code samples (Node/Python)

## References

- Official portal: https://geoportal.ancpi.ro/
- ArcGIS REST API docs: https://developers.arcgis.com/rest/services-reference/
- ANCPI notice (restart plan, 2026-08-20): https://www.ancpi.ro/
- Government communiqué: https://gov.ro/ro/media/comunicate/functionalitatea-link-de-plata-in-aplicatia-e-terra-reactivata&page=1
- Last manual verification: 2026-05-27
