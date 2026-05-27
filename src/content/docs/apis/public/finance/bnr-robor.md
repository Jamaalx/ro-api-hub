---
slug: bnr-robor
title: BNR ROBOR / ROBID Reference Rates
category: finance
institution: Banca Națională a României
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
official_docs: https://www.bnr.ro/files/d/Legislatie/En/RRR.pdf
api_base_url: https://www.bnr.ro
last_known_version: unknown
mandatory_for_business: false
---

# BNR ROBOR / ROBID Reference Rates

## Overview

ROBOR (Romanian Interbank Offered Rate) and ROBID (Bid) are the daily reference interest rates used historically for variable-rate RON loans. Published by BNR each working day for tenors ON, 1W, 1M, 3M, 6M, 9M, 12M. Note: for consumer credits ROBOR has been largely replaced by IRCC since 2019; ROBOR remains relevant for legacy contracts and corporate lending.

There is no dedicated REST API — the rates are published via the daily bulletin page and downloadable CSV.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://www.bnr.ro/Quotations-of-the-BNR-12.aspx` (English) / `https://www.bnr.ro/Cotatii-de-piata--BNR-1738.aspx` (RO) | Daily quotations page |
| GET | Series links on the Interactive DB | Historical CSV per tenor |

Exact CSV URLs vary; resolve from the page each time.

## Authentication

None.

## Request example

```bash
curl -A 'Mozilla/5.0' 'https://www.bnr.ro/Quotations-of-the-BNR-12.aspx'
```

## Response example

HTML table with the day's ROBID/ROBOR per tenor.

## Existing SDKs / wrappers

| Lang | Tool | Status | Notes |
|------|------|--------|-------|
| Community | Various scrapers | mixed | No widely adopted package |
| Aggregator | `openapi.ro` | active | Has some BNR-derived series |

## Testing approach

- [x] Direct HTTP — set a browser UA
- [x] Cache: rates change once per working day
- [x] On weekends/holidays the page still serves last working day's values
- [ ] No sandbox

## Known issues / gotchas

- ROBOR is being phased out for consumer products — confirm relevance for the use-case
- Page structure may change — implement defensive HTML parsing or rely on CSV downloads
- No machine-readable RSS / webhook — schedule a poller after BNR's typical 11:00 EET publication
- Differences between ROBOR (offer) and ROBID (bid) — pick the right side for the contract

## Tutorial seeds (for content pipeline)

- "Track ROBOR daily and update legacy variable-rate loans automatically"
- "ROBOR vs IRCC: how to migrate consumer loans (legal + tech)"
- "Building a ROBOR time-series API on Cloudflare Workers"

## ro-api-hub integration plan

- [ ] Scraper + parser materialized into Supabase
- [ ] REST endpoint: `GET /v1/robor/today`, `GET /v1/robor/history?tenor=3M`
- [ ] MCP tool: `bnr_robor_today`, `bnr_robor_history`
- [ ] Sister entry for IRCC (Index de Referință pentru Creditele Consumatorilor)

## References

- ROBOR RRR rules PDF: https://www.bnr.ro/files/d/Legislatie/En/RRR.pdf
- Daily quotations: https://www.bnr.ro/Quotations-of-the-BNR-12.aspx
- Last manual verification: 2026-05-27
