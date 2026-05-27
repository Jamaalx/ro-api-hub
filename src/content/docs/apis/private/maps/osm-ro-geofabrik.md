---
slug: osm-ro-geofabrik
title: OpenStreetMap Romania (Geofabrik / MapTiler extracts)
category: maps
institution: Geofabrik GmbH + MapTiler AG (mirrors of OSM contributors)
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
official_docs: https://download.geofabrik.de/europe/romania.html
api_base_url: https://download.geofabrik.de/
last_known_version: daily
mandatory_for_business: false
---

# OpenStreetMap Romania (Geofabrik / MapTiler extracts)

## Overview

OpenStreetMap data for Romania is distributed by Geofabrik (daily updated `.osm.pbf` + Shapefile extracts) and MapTiler (vector tiles + raw downloads). License is ODbL — attribution required. These extracts are the canonical source for building offline POI databases, routing graphs (OSRM/Valhalla/GraphHopper) and tile servers for RO.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://download.geofabrik.de/europe/romania-latest.osm.pbf` | Full RO extract |
| GET | `https://download.geofabrik.de/europe/romania.poly` | Boundary polygon |
| GET | `https://download.geofabrik.de/europe/romania-latest-free.shp.zip` | Shapefile bundle |
| GET | `https://data.maptiler.com/downloads/europe/romania/` | MapTiler downloads |
| GET | `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=...` | Tile API (key required) |

## Authentication

Downloads from Geofabrik: none. MapTiler tile API: API key (free tier available).

## Request example

```bash
curl -O 'https://download.geofabrik.de/europe/romania-latest.osm.pbf'
```

## Response example

Binary `.osm.pbf` (~250–400 MB).

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Routing | OSRM / Valhalla / GraphHopper | active | Consume PBF directly |
| Python | `osmium` / `pyrosm` | active | PBF readers |
| Multi | MapTiler SDKs | active | Tile clients |

## Testing approach

- [x] Direct HTTP download
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [x] Local simulator: tilemaker / OSRM container

## Known issues / gotchas

- ODbL requires attribution and share-alike on derived geodata.
- PBF file is heavy (~300 MB); plan disk / bandwidth.
- Geofabrik snapshots are daily; for minutely diffs use OSM main planet replication.
- MapTiler key tier limits MAU; throttle client-side.

## Tutorial seeds (for content pipeline)

- "Building a self-hosted OSRM routing server for Romania"
- "Extracting all restaurants in Cluj from Geofabrik PBF with osmium"
- "Cheap vector tiles for RO using tilemaker + Geofabrik"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] Mirror RO PBF nightly to CDN
- [ ] OpenAPI not applicable (static + 3rd-party tile APIs)
- [ ] MCP tool: nearest POI / route hint
- [ ] Code samples (Python osmium, Node OSRM client)

## References

- Geofabrik RO: https://download.geofabrik.de/europe/romania.html
- MapTiler RO: https://data.maptiler.com/downloads/europe/romania
- OSM ODbL: https://opendatacommons.org/licenses/odbl/
- Last manual verification: 2026-05-27
