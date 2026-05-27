---
slug: bnr-fx-yearly
title: BNR FX Rates — Yearly History
category: finance
institution: Banca Națională a României
country: RO
status: active
verified_at: 2026-05-27
auth: none
protocol: REST/XML
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: none_documented
official_docs: https://www.bnr.ro/Cursurile-pietei-valutare-in-format-XML-3424-Mobile.aspx
api_base_url: https://www.bnr.ro/files/xml/years/
last_known_version: "current"
mandatory_for_business: false
---

# BNR FX Rates — Yearly History

## Overview

For long-term backfills (audit, year-end reporting, retroactive invoicing), BNR publishes one XML per year containing every working-day rate for that year. Same schema as the daily file, just larger.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://www.bnr.ro/files/xml/years/nbrfxrates{YEAR}.xml` | All rates for `{YEAR}` (e.g. `2024`, `2025`, `2026`) |

## Authentication

None.

## Request example

```bash
curl 'https://www.bnr.ro/files/xml/years/nbrfxrates2025.xml' -o bnr-2025.xml
```

## Response example

```xml
<DataSet xmlns="http://www.bnr.ro/xsd">
  <Header>
    <PublishingDate>2025-12-31</PublishingDate>
  </Header>
  <Body>
    <Cube date="2025-12-31"><Rate currency="EUR">4.9712</Rate>...</Cube>
    <Cube date="2025-12-30"><Rate currency="EUR">4.9695</Rate>...</Cube>
    <!-- ~250 working days -->
  </Body>
</DataSet>
```

## Existing SDKs / wrappers

Same as `bnr-fx-today`. Most wrappers add a `historical(year)` helper that fetches and caches these yearly files.

For analytical use, also see `gov2-ro/tempo-ins-dump` patterns (DuckDB + Parquet) — applicable here to materialize BNR data into Parquet for analytics.

## Testing approach

- [x] Direct HTTP test — no UA spoof
- [x] Files are static and large (~200-300 KB) — cache forever once the year is closed
- [x] For current year, refresh daily

## Known issues / gotchas

- Current year's file is incrementally updated — re-fetch daily
- Older closed years are immutable — safe to cache forever
- Same multiplier=100 quirks as the daily feed
- Some currencies were added/removed over years (e.g. HRK removed after Croatia joined EUR in 2023) — handle missing keys

## Tutorial seeds (for content pipeline)

- "Backfill 5 years of BNR rates into PostgreSQL with one script"
- "Build a year-end reconciliation report from BNR XML in DuckDB"
- "Detect currency additions/removals across BNR yearly files"

## ro-api-hub integration plan

- [ ] REST wrapper: `GET /v1/fx/year/{year}` (JSON conversion)
- [ ] Materialized table in the hub's Supabase (Parquet snapshots)
- [ ] MCP tool: `bnr_fx_historical`
- [ ] Cron job that pulls today's daily into the time-series table

## References

- Landing page: https://www.bnr.ro/Cursurile-pietei-valutare-in-format-XML-3424-Mobile.aspx
- Last manual verification: 2026-05-27
