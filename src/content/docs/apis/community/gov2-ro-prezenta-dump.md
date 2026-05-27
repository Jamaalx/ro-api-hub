---
slug: gov2-ro-prezenta-dump
title: gov2-ro/prezenta.roaep.ro — Voter Turnout Dump (stale)
category: community
institution: gov2-ro (open-source)
country: RO
status: stale
verified_at: 2026-05-27
auth: none
protocol: static_files
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: "n/a (static)"
official_docs: https://github.com/gov2-ro/prezenta.roaep.ro
api_base_url: (static files in repo)
last_known_version: "(last commit 2024-12-05 — 1.5 yrs idle)"
mandatory_for_business: false
---

# gov2-ro/prezenta.roaep.ro

## Overview

Static dump of voter turnout data from `prezenta.roaep.ro` (Autoritatea Electorală Permanentă). **Stale** — last commit 2024-12-05, 1.5 years idle, despite intense electoral activity in 2024-2026 that would normally trigger updates. The upstream site (prezenta.roaep.ro) is JS-rendered and bot-blocked, so a maintained scraper / dump is genuinely valuable — this repo just needs revival.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| (static) | files in repo | CSV / JSON dumps per electoral cycle |

## Authentication

None.

## Request example

```bash
git clone https://github.com/gov2-ro/prezenta.roaep.ro
# Browse data/ directory for turnout files by cycle
```

## Response example

CSV with timestamp, județ, locality, voter counts.

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | None | — | Repo is data, not code |
| — | `code4romania/romanian-elections-data` | check | Related but separate |

## Testing approach

- [ ] Direct HTTP test
- [x] Playwright needed (for upstream prezenta.roaep.ro)
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- 1.5 years idle — missing 2025 + 2026 electoral cycles
- Upstream site bot-blocked + JS-rendered → scraping requires Playwright
- Schema may have evolved upstream since last dump

## Tutorial seeds (for content pipeline)

- **"Fork-and-revive: rebuilding gov2-ro/prezenta dump for the 2026 cycle"** — what to update (Playwright scraper, GitHub Actions cron, schema migration, snapshot every 30 min during election day)
- "Scraping JS-rendered RO gov sites with Playwright — prezenta.roaep.ro case study"
- "Time-series voter turnout analytics with the existing dump"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site (mark as stale)
- [ ] Consider fork-and-revive — high civic value, low maintenance burden once Actions cron is set up
- [ ] Pair with `code4romania/romanian-elections-data` to avoid duplication
- [ ] Expose live turnout query as MCP tool during election cycles

## References

- Repo: https://github.com/gov2-ro/prezenta.roaep.ro
- Last commit: 2024-12-05
- Upstream: https://prezenta.roaep.ro/ (JS-rendered, bot-blocked)
- Last manual verification: 2026-05-27
