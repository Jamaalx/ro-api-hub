---
slug: geo-spatial-org
title: geo-spatial.org (community GIS)
category: geo
institution: geo-spatial.org (NGO / community)
country: RO
status: active
verified_at: 2026-05-27
auth: none
protocol: OGC_WMS
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

# geo-spatial.org (community GIS)

## Overview

Long-running Romanian GIS community portal hosting GeoNetwork (metadata catalogue) and GeoServer (OGC WMS/WFS/CSW endpoints) for community-contributed geospatial datasets, including historical maps, administrative layers, and projects mirrored from public bodies. Active 2026-01-22 per the verification report and confirmed reachable 2026-05-27.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://geo-spatial.org/` | Community portal |
| GET | (GeoNetwork CSW endpoint) | Metadata catalogue |
| GET | (GeoServer WMS/WFS endpoints) | Map layers |

Exact CSW/WMS/WFS URLs are listed inside the portal's "Servicii" section.

## Authentication

None for read.

## Request example

```bash
curl 'https://geo-spatial.org/'
```

## Response example

HTML index; OGC endpoints return standard XML.

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Python | `OWSLib` | active | Generic OGC |
| JS | `OpenLayers` | active | Generic OGC |

## Testing approach

- [x] Direct HTTP test
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- Community-run, no SLA — be polite with crawl rates
- Dataset quality varies (community contributions)
- Some layers may be derived from third-party data with their own licensing — check per-dataset metadata

## Tutorial seeds (for content pipeline)

- "Discovering Romanian historical maps via geo-spatial.org"
- "GeoServer WMS layers from community sources: how to attribute"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] Metadata mirror (CSW harvest)
- [ ] Tile proxy with attribution headers

## References

- Portal: https://geo-spatial.org/
- Last manual verification: 2026-05-27
