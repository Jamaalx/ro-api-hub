---
slug: inhga-hydrology
title: INHGA — Hydrological Bulletins
category: geo
institution: Institutul Național de Hidrologie și Gospodărire a Apelor (INHGA)
country: RO
status: active
verified_at: 2026-05-27
auth: none
protocol: REST/XML
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: unknown
official_docs: https://www.hidro.ro/
api_base_url: https://www.hidro.ro/
last_known_version: unknown
mandatory_for_business: false
---

# INHGA — Hydrological Bulletins

## Overview

The Romanian National Institute of Hydrology and Water Management (INHGA) publishes daily and event-driven hydrological bulletins, flood warnings, and river-flow data. Distribution is a semi-API: XML feeds and PDF bulletins linked from `hidro.ro`. No formal OpenAPI, but content is regular enough to parse.

Verified active 2026-04-23 in the verification report.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://www.hidro.ro/` | Landing + bulletin index |
| GET | (Bulletin PDF/XML URLs) | Daily / event bulletins |

URLs of individual bulletins follow date patterns; resolve from the landing page.

## Authentication

None.

## Request example

```bash
curl -A 'Mozilla/5.0' 'https://www.hidro.ro/'
```

## Response example

HTML index; bulletins are PDF or XML attachments.

## Existing SDKs / wrappers

None known.

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [x] Browser UA spoof recommended
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- No formal API — content is HTML index + PDF/XML files
- Bulletin URL patterns include dates; scrapers should handle 404s gracefully on weekends/holidays
- Coordinate with INHGA for any commercial reuse

## Tutorial seeds (for content pipeline)

- "Parsing INHGA daily flood bulletins into structured JSON"
- "Building a Romanian river-level Slack bot from INHGA feeds"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] Daily scraper → normalized JSON
- [ ] Webhook for new bulletin

## References

- Portal: https://www.hidro.ro/
- Last manual verification: 2026-05-27 (also active 2026-04-23 per verification report)
