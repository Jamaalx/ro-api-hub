---
slug: listafirme-eu
title: listafirme.eu — Romanian Companies Data
category: aggregator
institution: listafirme.eu (commercial)
country: RO
status: gated
verified_at: 2026-05-27
auth: api_key
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: true
pricing: pay_as_you_go
rate_limit: "credit-based (per-call credit consumption)"
official_docs: https://listafirme.eu/
api_base_url: https://api.listafirme.eu/v1/
last_known_version: "v1"
mandatory_for_business: false
---

# listafirme.eu

## Overview

Commercial Romanian companies-data aggregator combining ONRC (registry), ANAF (VAT/financials), and BPI (Bulletin of Insolvency Proceedings). Operates on a credit-based model — each API call consumes credits depending on which sources are queried. Gated: requires account creation and credit pre-purchase. Strong choice when bulk historical financials are needed (vs free ANAF v9 which only gives current snapshot).

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://api.listafirme.eu/v1/company/{CUI}` | Aggregated company profile |
| GET | `https://api.listafirme.eu/v1/company/{CUI}/financials` | Historical balance sheets |
| GET | `https://api.listafirme.eu/v1/company/{CUI}/insolvency` | BPI proceedings |
| GET | `https://api.listafirme.eu/v1/search` | Search by name / CAEN / locality |

## Authentication

Register at listafirme.eu → buy credits → use API key in `Authorization: Bearer` header (exact scheme per account dashboard).

## Request example

```bash
curl -H "Authorization: Bearer YOUR_KEY" \
  https://api.listafirme.eu/v1/company/14399840
```

## Response example

```json
{ "cui": 14399840, "name": "DEDEMAN SRL", "...": "..." }
```

> Exact schema gated behind account; confirm during integration.

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | None public | — | API access gated, SDKs maintained privately by integrators |

## Testing approach

- [ ] Direct HTTP test (curl / fetch) — gated, need paid account
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- **Link check 2026-09-24:** `api_base_url` https://api.listafirme.eu/v1/ → ENOTFOUND (twice, ≥30 s apart). Needs a human to find the new URL.
- Credit consumption opaque until you read the price grid per endpoint
- Multi-source merge can give conflicting info (e.g. ONRC says active, ANAF says VAT cancelled)
- No documented SLA / rate limits beyond credit budget
- Account approval can take 1-2 business days

## Tutorial seeds (for content pipeline)

- "Bulk financial scoring 1000 Romanian companies with listafirme.eu"
- "BPI insolvency monitoring via listafirme.eu vs scraping bpi.ro directly"
- "Credit-cost optimization: which endpoints to call first"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] Document credit-pricing model (research current rates)
- [ ] Mark as paid/gated alternative when listing free aggregators
- [ ] MCP tool exposed via FastMCP (optional adapter for paid users)

## References

- Official site: https://listafirme.eu/
- Last manual verification: 2026-05-27
- **Missing data**: full endpoint catalogue (gated behind login)
