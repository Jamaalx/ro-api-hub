---
slug: anm-weather-xml
title: Meteo Romania (ANM) XML feeds
category: geo
institution: Administrația Națională de Meteorologie (ANM)
country: RO
status: active
verified_at: 2026-05-27
auth: none
protocol: REST/XML
openapi_spec: false
sandbox_available: false
contract_required: true
pricing: free
rate_limit: unknown
official_docs: https://www.meteoromania.ro/servicii/
api_base_url: https://www.meteoromania.ro/
last_known_version: unknown
mandatory_for_business: false
---

# Meteo Romania (ANM) XML feeds

## Overview

The Romanian National Meteorological Administration (ANM) publishes a set of XML feeds covering current weather, city forecasts, severe-weather warnings, nowcasting alerts, and RSS news. The feeds are technically reachable without authentication for viewing, but ANM's terms require a written reuse contract for any commercial or systematic redistribution.

Verified active during the 2026-05-27 sweep.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://www.meteoromania.ro/servicii/` | Service catalogue (HTML) |
| GET | (Starea vremii API) | Current weather observations |
| GET | (Prognoză orașe XML) | City forecast feed |
| GET | (Avertizări Meteo XML) | Severe weather warnings |
| GET | (Nowcasting XML) | Nowcasting alerts |
| GET | (RSS) | News / advisory RSS |

Exact per-feed URLs change occasionally; resolve them from the `servicii` page.

## Authentication

None for the public XML, but **reuse requires a contract with ANM** per their terms of service.

## Request example

```bash
curl -A 'Mozilla/5.0 (compatible; ro-api-hub/1.0)' 'https://www.meteoromania.ro/servicii/'
```

## Response example

XML schemas vary per feed; see each feed's inline DTD/comment header.

## Existing SDKs / wrappers

None known to be actively maintained.

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [x] Browser UA spoof recommended (default fetcher UA may be challenged)
- [ ] Playwright needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- **Reuse forbidden without contract** — public viewing is free, but redistribution / commercial use needs a written agreement with ANM
- Feed URLs are not all listed in one stable index; the `servicii` page is the canonical discovery point
- XML schemas are inconsistent across feeds (no shared XSD)
- WAF may reject default UAs — set a realistic browser UA

## Tutorial seeds (for content pipeline)

- "Parsing ANM severe-weather warnings into a Slack alert bot (personal use)"
- "Why you cannot redistribute Meteo Romania data without a contract"

## ro-api-hub integration plan

- [ ] Catalogue entry with explicit reuse warning
- [ ] No public wrapper (legal risk) until contract is in place
- [ ] OpenAPI describing XML schemas (for internal use)

## References

- Service catalogue: https://www.meteoromania.ro/servicii/
- ANM: https://www.meteoromania.ro/
- Last manual verification: 2026-05-27
