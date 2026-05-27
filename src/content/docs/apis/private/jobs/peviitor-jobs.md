---
slug: peviitor-jobs
title: peviitor.ro Open Jobs API
category: jobs
institution: Asociația peViitor (NGO)
country: RO
status: active
verified_at: 2026-05-27
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: true
contract_required: false
pricing: free
rate_limit: none_documented
official_docs: https://github.com/peviitor-ro/api
api_base_url: https://api.peviitor.ro
last_known_version: unknown
mandatory_for_business: false
---

# peviitor.ro Open Jobs API

## Overview

peViitor.ro is a Romanian NGO that aggregates jobs scraped from 1000+ company career sites and partner portals, normalises them, and offers them through a **free, open-source REST API**. Backend uses Solr; data is searchable by keyword, city, judet, company, contract type. Codebase is open at github.com/peviitor-ro. Companion repo `ui.orase` also offers an OpenAPI for RO cities.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `/jobs` | Search jobs (q, city, company, page) |
| GET | `/jobs/{id}` | Job details |
| GET | `/companies` | List aggregated companies |
| GET | `/cities` | List cities with job counts |
| GET | `/stats` | Aggregate stats |

## Authentication

None — public read.

## Request example

```bash
curl 'https://api.peviitor.ro/jobs?q=developer&city=Cluj-Napoca&page=1'
```

## Response example

```json
{ "total": 532, "hits": [ { "id": "...", "title": "Senior Dev", "company": "X", "city": "Cluj-Napoca" } ] }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Python | scrapers in `peviitor-ro` org | active | 1000+ company scrapers |
| Web | peviitor.ro front-end | active | Open-source React |

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [x] Sandbox available (live API is open)
- [x] Local simulator: docker-compose from repo

## Known issues / gotchas

- Volunteer-run; uptime not SLA-backed.
- Scraper coverage varies — some sites broken at any time.
- Schema evolves with the project; pin to a date if you build on top.
- No write API — read-only aggregator.

## Tutorial seeds (for content pipeline)

- "Building a Cluj-only jobs board on top of peviitor.ro API"
- "Self-hosting peviitor for a private talent CRM"
- "Contributing a new company scraper to peviitor-ro"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (PR upstream)
- [ ] Thin REST wrapper (cached facade)
- [ ] MCP tool exposed via FastMCP
- [ ] Code samples (Node/Python)

## References

- Repo: https://github.com/peviitor-ro/api
- Site: https://www.peviitor.ro
- Cities UI: https://peviitor-ro.github.io/ui.orase
- Last manual verification: 2026-05-27
