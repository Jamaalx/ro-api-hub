---
slug: anm-inspire
title: ANM INSPIRE WMS/WFS
category: geo
institution: Administrația Națională de Meteorologie (ANM)
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: none
protocol: OGC_WMS
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: none_documented
official_docs: https://inspire.meteoromania.ro/geonetwork/srv/search
api_base_url: https://inspire.meteoromania.ro/
last_known_version: WMS 1.3 / WFS 2.0
mandatory_for_business: false
---

# ANM INSPIRE WMS/WFS

## Overview

ANM's INSPIRE-conformant geospatial services exposing meteorological observations and forecasts as OGC WMS (Web Map Service) and WFS (Web Feature Service). Discovery is via the GeoNetwork catalogue at `inspire.meteoromania.ro`. Unlike the general Meteo Romania XML feeds, the INSPIRE delivery is built specifically for machine reuse under INSPIRE Directive rules.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://inspire.meteoromania.ro/geonetwork/srv/search` | GeoNetwork catalogue (discovery) |
| GET | `{wms_base}?service=WMS&request=GetCapabilities` | WMS capabilities |
| GET | `{wms_base}?service=WMS&version=1.3.0&request=GetMap&layers=...&bbox=...&crs=EPSG:4258&width=...&height=...&format=image/png` | Raster map tile |
| GET | `{wfs_base}?service=WFS&request=GetCapabilities` | WFS capabilities |
| GET | `{wfs_base}?service=WFS&version=2.0.0&request=GetFeature&typeNames=...` | Feature query |

WMS/WFS base URLs are listed in the GeoNetwork records.

## Authentication

None.

## Request example

```bash
# Discover services
curl 'https://inspire.meteoromania.ro/geonetwork/srv/eng/csw?service=CSW&request=GetCapabilities'
```

## Response example

Standard OGC CSW / WMS / WFS XML.

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Python | `OWSLib` | active | CSW + WMS + WFS client |
| JS | `OpenLayers` | active | Native WMS/WFS layers |

## Testing approach

- [x] Direct HTTP test against GeoNetwork CSW
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- Service URLs must be resolved from CSW records — not all are published in a single index
- INSPIRE schema constraints may make WFS responses verbose; use bbox filters
- ANM's general weather XML feeds (separate catalogue entry) have stricter reuse terms — INSPIRE delivery is intended to be open per the Directive

## Tutorial seeds (for content pipeline)

- "Using ANM INSPIRE WMS as a basemap in Leaflet/MapLibre"
- "Discovering Romanian meteorological datasets via CSW"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] Service URL discovery script (cron-refreshed)
- [ ] Thin tile proxy with caching

## References

- Catalogue: https://inspire.meteoromania.ro/geonetwork/srv/search
- INSPIRE Directive 2007/2/EC: https://inspire.ec.europa.eu/
- Last manual verification: 2026-05-27
