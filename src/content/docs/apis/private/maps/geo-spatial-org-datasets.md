---
slug: geo-spatial-org-datasets
title: geo-spatial.org Romanian Geo Datasets
category: maps
institution: Asociația geo-spatial.org
country: RO
status: active
verified_at: 2026-05-27
auth: none
protocol: static_files
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: none_documented
official_docs: https://geo-spatial.org/
api_base_url: https://geo-spatial.org/
last_known_version: unknown
mandatory_for_business: false
---

# geo-spatial.org Romanian Geo Datasets

## Overview

geo-spatial.org is a Romanian volunteer-run portal hosting open geo datasets (SIRUTA mapping, administrative boundaries at NUTS/judet/comuna/sat level, roads, lakes, rivers, hexbin tiles, historical maps). Data is distributed as static downloads (Shapefile, GeoJSON, GeoPackage, CSV) rather than a live API. License typically CC-BY or compatible.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `/maps/...` | Browse map gallery |
| GET | `/download/...` | Direct dataset downloads |
| GET | `/vechi/` | Historical / archive data |

## Authentication

None.

## Request example

```bash
curl -O 'https://geo-spatial.org/download/<dataset>.zip'
```

## Response example

Binary zip / shp / geojson files.

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| GIS | QGIS / ArcGIS direct open | n/a | Open files directly |
| Python | GeoPandas read_file | n/a | Works on downloaded geojson |

## Testing approach

- [x] Direct HTTP download
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- Static files; no incremental updates — must re-download.
- Some older datasets in EPSG:31700 (Stereo70), others in EPSG:3844 (Stereo70 new), few in WGS84.
- SIRUTA / NUTS code mappings updated occasionally — pin a version.
- Volunteer-run; downtime possible without notice.

## Tutorial seeds (for content pipeline)

- "Mapping RO judete using geo-spatial.org boundaries in Leaflet"
- "Converting Stereo70 (EPSG:3844) to WGS84 with PROJ in Python"
- "SIRUTA + INS dataset join cookbook"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] Mirror most-used datasets to CDN
- [ ] OpenAPI not applicable (static files)
- [ ] MCP tool: list / download
- [ ] Code samples (Python GeoPandas / Node turf)

## References

- Portal: https://geo-spatial.org/
- Last manual verification: 2026-05-27
