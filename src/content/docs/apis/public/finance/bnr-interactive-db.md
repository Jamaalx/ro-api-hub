---
slug: bnr-interactive-db
title: BNR Interactive Statistics Database
category: finance
institution: Banca Națională a României
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: none
protocol: static_files
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: none_documented
official_docs: https://www.bnr.ro/Interactive-database-1107.aspx
api_base_url: https://www.bnr.ro/Interactive-database-1107.aspx
last_known_version: unknown
mandatory_for_business: false
---

# BNR Interactive Statistics Database

## Overview

BNR's interactive database publishes hundreds of macroeconomic time series: monetary aggregates, balance of payments, external debt, interest rates, bank statistics, etc. Web-only UI built on a server-rendered form; CSV/Excel/XML can be downloaded per series. There is no official REST API.

> **Catalogue fix (verified 2026-05-27):** the historical link `https://www.bnro.ro/Interactive-database-1107.aspx` 302-redirects to `https://www.bnr.ro/Interactive-database-1107.aspx`. Always use the `bnr.ro` (no `o`) host.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://www.bnr.ro/Interactive-database-1107.aspx` | Landing — series tree |
| GET | `https://www.bnr.ro/Interactive-database/Get.aspx?id=...&format=csv` | Download a series (URL pattern observed via web UI) |

The download URL schema is not documented; reverse-engineer by inspecting the form on the landing page.

## Authentication

None.

## Request example

```bash
# Use a real browser User-Agent — default curl UA can be rejected by the WAF
curl -A 'Mozilla/5.0' 'https://www.bnr.ro/Interactive-database-1107.aspx'
```

## Response example

HTML form for series selection; CSV / Excel / XML download per selected series.

## Existing SDKs / wrappers

None. Most analytics teams scrape selectively into a local DuckDB / Parquet store (see `gov2-ro/tempo-ins-dump` for an analogous pattern on INS).

## Testing approach

- [ ] Direct HTTP — works but requires browser UA
- [x] Playwright recommended for dynamic series-tree navigation
- [ ] No sandbox
- [x] Locally cache downloaded series; refresh on BNR's stated frequency per series (monthly/quarterly)

## Known issues / gotchas

- **Host fix**: `bnro.ro` redirects to `bnr.ro` — use `bnr.ro` directly
- Download URL is not officially documented — may change without notice
- Default User-Agent may be blocked by WAF — set a realistic browser UA
- No incremental delta API — always re-download the full series
- Series IDs are opaque; build a registry once and version it

## Tutorial seeds (for content pipeline)

- "Mirror BNR Interactive Database into DuckDB nightly"
- "Build a dashboard of BNR monetary aggregates with the Interactive DB"
- "Resilient scraping patterns when the URL schema changes"

## ro-api-hub integration plan

- [ ] Catalogue entry noting host fix
- [ ] Playwright-based scraper running on schedule
- [ ] Materialize into Supabase time-series table
- [ ] MCP tool: `bnr_series_get`, `bnr_series_search`

## References

- Landing page: https://www.bnr.ro/Interactive-database-1107.aspx
- Last manual verification: 2026-05-27
