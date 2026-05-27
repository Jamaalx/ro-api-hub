---
slug: aep-prezenta
title: AEP — Prezența la vot și rezultate
category: elections
institution: Autoritatea Electorală Permanentă (AEP)
country: RO
status: active
verified_at: 2026-05-27
auth: none
protocol: static_files
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: none_documented
official_docs: https://prezenta.roaep.ro/
api_base_url: https://prezenta.roaep.ro/
last_known_version: "per election cycle"
mandatory_for_business: false
---

# AEP — prezenta.roaep.ro

## Overview

AEP's `prezenta.roaep.ro` publishes near-real-time voter turnout statistics and (after polls close) results for each Romanian election. The frontend is a JavaScript SPA that fetches static JSON files from `/data/...` paths, refreshed every few minutes during election day. These JSON files are publicly accessible without auth and contain turnout by county/UAT/polling station plus, post-results, vote tallies per candidate/list. Community projects (`code4romania/romanian-elections-data`, `gov2-ro/prezenta.roaep.ro`) provide normalized archives.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://prezenta.roaep.ro/` | SPA front-end |
| GET | `https://prezenta.roaep.ro/data/csv/...` | Turnout CSV (per cycle) |
| GET | `https://prezenta.roaep.ro/data/json/...` | Turnout/results JSON (per cycle) |

## Authentication

None.

## Request example

```bash
curl 'https://prezenta.roaep.ro/{cycle-slug}/data/json/sicpv/pv/pv_part.json' \
  -H 'User-Agent: Mozilla/5.0'
```

(URL structure varies per election cycle; inspect the active SPA's Network tab to discover the current paths.)

## Response example

```json
{
  "scopes": {
    "CNTRY": { "voted": 5234123, "list_eligible": 18000000, "percent": 29.08 },
    "CTY": [ { "code": "B", "voted": ..., "percent": ... } ]
  }
}
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Multi | `code4romania/romanian-elections-data` | active | Normalized archives |
| Py | `gov2-ro/prezenta.roaep.ro` | stale (2024-12) | 1.5 yrs idle |

## Testing approach

- [x] Direct HTTP test (curl / fetch) — JSON files are static
- [x] Playwright needed (only to discover URL structure of new cycles)
- [x] Browser UA spoof recommended
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- SPA hides URL structure — first scrape requires discovering paths via DevTools.
- Per-cycle URLs change; previous-election URLs persist as historical snapshots.
- Polling-station-level data is large (10-100MB) per cycle.

## Tutorial seeds (for content pipeline)

- "Cum prinzi prezența la vot în direct fără să încarci serverul AEP"
- "Construiește o hartă coropletă din JSON-urile prezenta.roaep.ro"

## ro-api-hub integration plan

- [x] Catalogue entry
- [ ] Per-cycle path discovery helper
- [ ] Thin proxy + Redis cache (5-min TTL during election days)
- [ ] MCP tool: `get_election_turnout(cycle, county)`
- [ ] Sample notebooks (Python + R)

## References

- AEP: https://www.roaep.ro/
- Prezența: https://prezenta.roaep.ro/
- Normalized data: https://github.com/code4romania/romanian-elections-data
- Last manual verification: 2026-05-27
