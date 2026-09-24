---
slug: onrc-opendata
title: ONRC open datasets (via data.gov.ro)
category: registry
institution: Oficiul Național al Registrului Comerțului (ONRC) / data.gov.ro
country: RO
status: stale
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: none_documented
official_docs: https://data.gov.ro/organization/onrc
api_base_url: https://data.gov.ro/api/3/action/
last_known_version: CKAN v3
mandatory_for_business: false
---

# ONRC open datasets (via data.gov.ro)

## Overview

ONRC publishes a small set of open datasets (e.g., new registrations, dissolutions, statistics) on Romania's national open-data portal `data.gov.ro`, which exposes a CKAN v3 JSON API. The data.gov.ro platform itself is active (verified 2026-05-27), but the ONRC datasets are released on an irregular cadence — many files are months or years stale.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://data.gov.ro/organization/onrc` | Organization page (HTML) |
| GET | `https://data.gov.ro/api/3/action/package_search?q=organization:onrc` | List ONRC datasets |
| GET | `https://data.gov.ro/api/3/action/package_show?id={dataset}` | Dataset metadata + resources |
| GET | `https://data.gov.ro/api/3/action/datastore_search?resource_id=...` | Tabular search (if datastore-enabled) |
| GET | `https://data.gov.ro/api/3/action/datastore_search_sql?sql=...` | SQL over datastore |

## Authentication

None (optional CKAN API key for higher quotas).

## Request example

```bash
curl 'https://data.gov.ro/api/3/action/package_search?q=organization:onrc'
```

## Response example

```json
{ "success": true, "result": { "count": N, "results": [ { "name": "...", "resources": [ { "url": "...", "format": "CSV" } ] } ] } }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Python | `ckanapi` | active | Generic CKAN client |
| JS | (any HTTP client) | n/a | Plain JSON |

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- **Freshness is the main problem** — ONRC's open datasets are often months stale; the CKAN platform works, but the publishing cadence is the bottleneck
- Many datasets are CSV/XLS attachments without `datastore` extraction — you must download and parse the file directly
- For real-time or detailed company data, RECOM Online (gated) or a third-party aggregator is required

## Tutorial seeds (for content pipeline)

- "Querying ONRC open datasets via the data.gov.ro CKAN API"
- "Why ONRC open data is months stale — and what to use instead"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] Cron that snapshots all ONRC resources weekly to S3/R2
- [ ] Wrapper that returns freshest available file by dataset name

## References

- Organization page: https://data.gov.ro/organization/onrc
- CKAN API docs: https://docs.ckan.org/en/2.10/api/
- Last manual verification: 2026-05-27
