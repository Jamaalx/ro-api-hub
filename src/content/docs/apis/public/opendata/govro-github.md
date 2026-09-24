---
slug: govro-github
title: govro GitHub Organization
category: opendata
institution: govro (community, semi-official)
country: RO
status: stale
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: none
protocol: static_files
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: "GitHub API standard"
official_docs: https://github.com/govro
api_base_url: https://github.com/govro
last_known_version: "n/a"
mandatory_for_business: false
---

# govro GitHub Organization

## Overview

The `govro` GitHub organization historically hosted Romanian government datasets and tooling experiments (e.g. `govro/datagovro`). Last meaningful activity was around 2017; effectively abandoned. Repositories remain accessible and may contain useful historical snapshots, but no fresh data should be expected. For current public datasets, use data.gov.ro (CKAN) directly. The much more active community alternative is `code4romania` and `peviitor-ro`.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://github.com/govro` | Org page |
| GET | `https://github.com/govro/datagovro` | Legacy dataset repo |

## Authentication

GitHub anonymous; rate limits apply (60 req/h unauthenticated, 5000 with token).

## Request example

```bash
curl 'https://api.github.com/orgs/govro/repos'
```

## Response example

```json
[ { "name": "datagovro", "pushed_at": "2017-...", "stargazers_count": 12 } ]
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | Any GitHub SDK | — | Octokit, PyGithub, etc. |

## Testing approach

- [x] Direct HTTP test (curl / fetch) — GitHub API
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- Abandoned since ~2017; do not treat as a current source.
- Some CSV/JSON snapshots may still be useful as historical references.
- For current data, prefer data.gov.ro CKAN API.

## Tutorial seeds (for content pipeline)

- "Repo-uri abandonate gov.ro: ce mai poți recupera"
- "code4romania + peviitor: cum arată open-source civic activ în 2026"

## ro-api-hub integration plan

- [ ] Catalogue entry marked STALE
- [ ] Link to data.gov.ro as the canonical replacement
- [ ] No wrapper

## References

- Org: https://github.com/govro
- Legacy repo: https://github.com/govro/datagovro
- Last manual verification: 2026-05-27
