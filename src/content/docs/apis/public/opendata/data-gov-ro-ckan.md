---
slug: data-gov-ro-ckan
title: data.gov.ro — CKAN API
category: opendata
institution: Autoritatea pentru Digitalizarea României (ADR)
country: RO
status: active
verified_at: 2026-05-27
auth: api_key
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: unknown
official_docs: https://data.gov.ro/pages/developers
api_base_url: https://data.gov.ro/api/3/action/
last_known_version: "CKAN 3"
mandatory_for_business: false
---

# data.gov.ro — CKAN API

## Overview

data.gov.ro is Romania's national open-data portal, powered by CKAN. It exposes the standard CKAN Action API (`/api/3/action/...`), giving programmatic access to package metadata, resources, organizations, and (where the dataset is in the DataStore) full-text + SQL search over tabular data. Verified working 2026-05-27 — returns JSON, 2000+ packages catalogued. Many individual datasets are stale, but the platform itself is operational and a reliable index.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://data.gov.ro/api/3/action/package_list` | List all dataset IDs |
| GET | `https://data.gov.ro/api/3/action/package_show?id={id}` | Dataset detail + resources |
| GET | `https://data.gov.ro/api/3/action/organization_list` | List publishing organizations |
| GET | `https://data.gov.ro/api/3/action/datastore_search?resource_id={rid}` | Query tabular data |
| GET | `https://data.gov.ro/api/3/action/datastore_search_sql?sql=...` | SQL over DataStore |
| GET | `https://data.gov.ro/api/3/action/group_list` | List groups (categories) |

## Authentication

- Read: no auth required.
- Write/admin: API key in `Authorization` header (for dataset publishers).

## Request example

```bash
curl 'https://data.gov.ro/api/3/action/package_search?q=fiscal&rows=5'
```

## Response example

```json
{
  "help": "https://data.gov.ro/api/3/action/help_show?name=package_search",
  "success": true,
  "result": {
    "count": 17,
    "results": [
      { "name": "anaf-cazier-fiscal", "title": "...", "resources": [{"url": "...", "format": "CSV"}] }
    ]
  }
}
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Python | `ckanapi` | active | Official CKAN client |
| Node | `node-ckan` | varies | Several thin wrappers |
| R | `ckanr` | active | rOpenSci |

## Testing approach

- [x] Direct HTTP test (curl / fetch) — works without auth
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- Many published datasets are stale (last update years ago) — verify `metadata_modified` per package.
- DataStore is enabled for only a subset of resources; check `datastore_active` flag.
- Resource URLs sometimes point to external sites that may 404.
- Rate limit not published — be polite, cache aggressively.

## Tutorial seeds (for content pipeline)

- "Cum cataloghezi toate datasets-urile din data.gov.ro într-un Postgres local"
- "Construiește un MCP tool peste CKAN data.gov.ro pentru asistenți AI"
- "SQL peste DataStore: full-text search pe seturile RO"

## ro-api-hub integration plan

- [x] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (CKAN Action API subset)
- [ ] Thin REST facade with cache + freshness indicator
- [ ] MCP tool: `search_open_dataset`, `get_dataset`
- [ ] Node/Python/PHP samples

## References

- Developer docs: https://data.gov.ro/pages/developers
- CKAN docs: https://docs.ckan.org/en/latest/api/
- Last manual verification: 2026-05-27
