---
slug: code4ro-monitorizare-vot
title: Monitorizare Vot — Code for Romania (ARCHIVED)
category: community
institution: Code for Romania (NGO)
country: RO
status: stale
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: api_key
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: unknown
official_docs: https://github.com/code4romania/monitorizare-vot
api_base_url: (varies per deployment)
last_known_version: "n/a"
mandatory_for_business: false
---

# Monitorizare Vot — Code for Romania (ARCHIVED)

> **STATUS: ARCHIVED on GitHub on 2025-05-26.** Repository is now read-only. The platform was used by NGOs to coordinate election observers across Romanian polling stations. For active election-day monitoring, check Code for Romania for successor projects.

## Overview

Monitorizare Vot was Code for Romania's flagship platform for crowdsourcing election observer reports — observers used a mobile app to log irregularities at polling stations, and the central API aggregated reports for civil society to analyse. The project supported multiple election cycles. Repo archived 2025-05-26; ongoing fork or successor project status not yet identified at verification time.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://github.com/code4romania/monitorizare-vot` | Source (archived) |
| — | (varied per deployment) | Per-cycle backend |

## Authentication

API key issued to NGO partners (per deployment).

## Request example

```bash
# Per-cycle endpoint; consult repo for last known schema
```

## Response example

```json
{ "answers": [ { "questionId": ..., "value": "..." } ] }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| .NET / mobile | inside the repo | archived | iOS, Android, ASP.NET backend |

## Testing approach

- [x] Direct HTTP test (curl / fetch) — only against last deployment
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- Archived — no further maintenance.
- Per-election deployments may already be torn down.
- Check Code for Romania for any successor project before integrating.

## Tutorial seeds (for content pipeline)

- "Monitorizare Vot arhivat: ce ai învățat din 8 ani de civic-tech electoral"
- "Cum poți contribui acum la transparența electorală RO"

## ro-api-hub integration plan

- [ ] Catalogue entry marked ARCHIVED
- [ ] Monitor Code for Romania for successor
- [ ] No wrapper

## References

- Repo (archived): https://github.com/code4romania/monitorizare-vot
- Code for Romania: https://code4.ro/
- Last manual verification: 2026-05-27
