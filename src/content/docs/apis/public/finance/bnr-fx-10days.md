---
slug: bnr-fx-10days
title: BNR FX Rates — Last 10 Days
category: finance
institution: Banca Națională a României
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: none
protocol: REST/XML
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: none_documented
official_docs: https://www.bnr.ro/Cursurile-pietei-valutare-in-format-XML-3424-Mobile.aspx
api_base_url: https://www.bnr.ro/nbrfxrates10days.xml
last_known_version: "current"
mandatory_for_business: false
---

# BNR FX Rates — Last 10 Days

## Overview

Same format as `nbrfxrates.xml` but contains the last 10 publication days. Useful for backfilling weekend gaps, computing simple SMA / volatility, or rendering a sparkline. Updated daily ~13:00 EET.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://www.bnr.ro/nbrfxrates10days.xml` | Last 10 working-day rates |

## Authentication

None.

## Request example

```bash
curl 'https://www.bnr.ro/nbrfxrates10days.xml'
```

## Response example

```xml
<DataSet xmlns="http://www.bnr.ro/xsd">
  <Header>
    <PublishingDate>2026-05-26</PublishingDate>
  </Header>
  <Body>
    <Cube date="2026-05-26"><Rate currency="EUR">4.9774</Rate>...</Cube>
    <Cube date="2026-05-23"><Rate currency="EUR">4.9768</Rate>...</Cube>
    <!-- ... 10 days ... -->
  </Body>
</DataSet>
```

Verified 2026-05-27: range covered 2026-05-13 → 2026-05-26.

## Existing SDKs / wrappers

Same as `bnr-fx-today`:

- `gibex/currency-bnr-lumen`
- `butchero/cursbnr`
- `sebastiancostiug/curs-valutar-bnr-rest-api`
- `openapi.ro/exchange`

Most wrappers parse both endpoints transparently.

## Testing approach

- [x] Direct HTTP test — no UA spoof
- [x] Cache aggressively (~1 hour)
- [x] Validate the response has exactly the expected `<Cube>` count on a working day

## Known issues / gotchas

- "10 days" means 10 BNR publication days (working days) — span can be ~14 calendar days
- Same multiplier=100 caveats as `bnr-fx-today` for JPY/HUF/KRW
- Don't use this to fetch a SPECIFIC historical date older than 10 days — use the yearly history file
- `<Cube>` order is newest-first in most implementations — confirm before iterating

## Tutorial seeds (for content pipeline)

- "Backfill missing weekend FX rates with `nbrfxrates10days.xml`"
- "Compute weekly volatility from BNR rates in Pandas"
- "EUR/RON sparkline component in React using the 10-day feed"

## ro-api-hub integration plan

- [ ] REST wrapper: `GET /v1/fx/range?days=10&currency=EUR`
- [ ] MCP tool: `bnr_fx_range`
- [ ] Combine with `bnr-fx-today` in a single client class

## References

- Landing page: https://www.bnr.ro/Cursurile-pietei-valutare-in-format-XML-3424-Mobile.aspx
- Last manual verification: 2026-05-27 (range 2026-05-13 → 2026-05-26)
