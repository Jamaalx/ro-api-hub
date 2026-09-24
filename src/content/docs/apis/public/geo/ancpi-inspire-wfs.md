---
slug: ancpi-inspire-wfs
title: ANCPI INSPIRE WFS — Cadastral Parcels
category: geo
institution: Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI)
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: none
protocol: OGC_WFS
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: none_documented
official_docs: https://inspire-geoportal.ec.europa.eu/srv/api/records/%7BB4C66413-3E17-4E33-A4DD-10F49950EB88%7D
api_base_url: unknown
last_known_version: WFS 2.0
mandatory_for_business: false
---

# ANCPI INSPIRE WFS — Cadastral Parcels

## Overview

INSPIRE-compliant Web Feature Service exposing the Romanian cadastral parcels dataset. Registered in the EU INSPIRE Geoportal under record `B4C66413-3E17-4E33-A4DD-10F49950EB88`. Conforms to OGC WFS 2.0 with the INSPIRE Cadastral Parcels (CP) application schema.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `{wfs_base}?service=WFS&request=GetCapabilities` | Capabilities document |
| GET | `{wfs_base}?service=WFS&version=2.0.0&request=DescribeFeatureType` | Feature type schema |
| GET | `{wfs_base}?service=WFS&version=2.0.0&request=GetFeature&typeNames=cp:CadastralParcel&bbox=...` | Feature query |

The exact `{wfs_base}` URL must be resolved from the INSPIRE Geoportal record metadata (link distribution section); ANCPI does not publish a stable HTTP base on geoportal.ancpi.ro.

## Authentication

None.

## Request example

```bash
# Resolve the WFS endpoint URL from the INSPIRE record first:
curl 'https://inspire-geoportal.ec.europa.eu/srv/api/records/%7BB4C66413-3E17-4E33-A4DD-10F49950EB88%7D'
# Then GetCapabilities against the resolved endpoint
curl '{wfs_base}?service=WFS&request=GetCapabilities'
```

## Response example

```xml
<wfs:WFS_Capabilities version="2.0.0" xmlns:wfs="http://www.opengis.net/wfs/2.0">
  <FeatureTypeList>
    <FeatureType><Name>cp:CadastralParcel</Name>...</FeatureType>
  </FeatureTypeList>
</wfs:WFS_Capabilities>
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Python | `OWSLib` | active | Standard OGC client |
| JS | `ol/format/WFS` (OpenLayers) | active | WFS GetFeature parsing |

## Testing approach

- [x] Direct HTTP test (curl / fetch) — GetCapabilities first
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- The INSPIRE-Geoportal record is the discovery layer; the actual WFS base URL must be parsed from the record's distribution links and may change without notice
- INSPIRE WFS responses are verbose GML — convert to GeoJSON via `ogr2ogr` for downstream use
- Bbox queries should use EPSG:4258 (ETRS89) per INSPIRE convention; verify with GetCapabilities `DefaultCRS`

## Tutorial seeds (for content pipeline)

- "Querying Romanian cadastral parcels via INSPIRE WFS with OWSLib"
- "Converting INSPIRE GML to GeoJSON with ogr2ogr"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] Resolve and pin the WFS base URL in the catalogue
- [ ] Thin REST wrapper that proxies WFS → GeoJSON
- [ ] MCP tool

## References

- INSPIRE record: https://inspire-geoportal.ec.europa.eu/srv/api/records/%7BB4C66413-3E17-4E33-A4DD-10F49950EB88%7D
- INSPIRE Cadastral Parcels theme: https://inspire.ec.europa.eu/theme/cp
- Last manual verification: 2026-05-27
