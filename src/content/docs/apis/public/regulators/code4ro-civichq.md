---
slug: code4ro-civichq
title: CivicHQ API — Code for Romania
category: community
institution: Code for Romania (NGO)
country: RO
status: stale
verified_at: 2026-05-27
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: unknown
official_docs: https://github.com/code4romania/civichq-api
api_base_url: (originally https://api.civichq.org/)
last_known_version: "v1 (2019)"
mandatory_for_business: false
---

# CivicHQ API — Code for Romania

## Overview

CivicHQ was a Code for Romania platform indexing civic-tech apps and initiatives, with a REST API to query them. The `code4romania/civichq-api` repository's last meaningful activity was 2019-10-03 — effectively abandoned. The org itself (`code4romania`) is very active in 2026 with many other current projects, but CivicHQ specifically is dormant. Treat as a historical reference only.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | (originally) `https://api.civichq.org/v1/apps` | List indexed civic apps |
| GET | `https://github.com/code4romania/civichq-api` | Source repo |

## Authentication

None.

## Request example

```bash
# Endpoint may not be live; check before relying on it
curl 'https://api.civichq.org/v1/apps'
```

## Response example

```json
{ "apps": [ { "name": "...", "category": "..." } ] }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | — | — | None — project itself dormant |

## Testing approach

- [x] Direct HTTP test (curl / fetch) — verify if endpoint still resolves
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- **Link check 2026-09-24:** `api_base_url` https://api.civichq.org/ → ENOTFOUND (twice, ≥30 s apart). Needs a human to find the new URL.
- Abandoned since 2019 — endpoint may be offline.
- Schema unlikely to be maintained.
- For current civic-tech inventory, check Code for Romania's GitHub org directly.

## Tutorial seeds (for content pipeline)

- "Ce s-a întâmplat cu CivicHQ și unde mai vezi proiecte civic-tech RO active"

## ro-api-hub integration plan

- [ ] Catalogue entry marked STALE
- [ ] Link to Code for Romania GitHub org as live alternative
- [ ] No wrapper

## References

- Repo: https://github.com/code4romania/civichq-api
- Code for Romania: https://github.com/code4romania
- Last manual verification: 2026-05-27
