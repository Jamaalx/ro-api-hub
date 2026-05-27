---
slug: peviitor-orase
title: peviitor.ro — Orașe + Jobs API
category: community
institution: peviitor.ro (NGO)
country: RO
status: active
verified_at: 2026-05-27
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: unknown
official_docs: https://peviitor-ro.github.io/ui.orase/
api_base_url: https://peviitor.ro/
last_known_version: "n/a"
mandatory_for_business: false
---

# peviitor.ro — Orașe + Jobs API

## Overview

peviitor.ro is one of the most actively maintained Romanian civic-tech projects (`peviitor-ro/api` had 1661 commits and last activity 2026-05-13 at verification time). It aggregates job postings from across Romania and provides a REST API and a structured catalog of Romanian cities (UAT). The Orașe component is a curated UAT registry useful as a reference dataset for geographic dropdowns and validation. APIs are open and free for civic / non-commercial use.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://peviitor-ro.github.io/ui.orase/` | UAT registry UI + JSON |
| GET | `https://peviitor.ro/api/` | Jobs API |
| GET | `https://api.peviitor.ro/...` | API base (consult repo for current spec) |

## Authentication

None.

## Request example

```bash
curl 'https://peviitor.ro/api/job/search/?q=developer&location=Cluj'
```

## Response example

```json
{
  "results": [
    { "title": "Backend Developer", "company": "...", "location": "Cluj-Napoca", "url": "..." }
  ]
}
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | `peviitor-ro/api` | active 2026 | Backend repo, 1661 commits |
| — | various UI repos | active | Multi-frontend ecosystem |

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- API surface evolves quickly — pin a commit or watch the repo for breaking changes.
- For commercial use, contact maintainers (project is volunteer-run).
- Job source coverage varies by site cooperation; treat as best-effort.

## Tutorial seeds (for content pipeline)

- "Construiește un job-board agregator folosind peviitor.ro API"
- "UAT-uri România: dataset gratuit pentru dropdown-uri și validare adrese"

## ro-api-hub integration plan

- [x] Catalogue entry (active community project)
- [ ] Link to upstream API
- [ ] MCP tool: `search_jobs_ro(query, location)`
- [ ] Use UAT dataset as canonical city reference in the hub

## References

- Org: https://github.com/peviitor-ro
- Orașe UI: https://peviitor-ro.github.io/ui.orase/
- Main site: https://peviitor.ro/
- Last manual verification: 2026-05-27 (last commit 2026-05-13)
