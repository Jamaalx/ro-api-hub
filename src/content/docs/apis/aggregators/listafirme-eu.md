---
slug: listafirme-eu
title: listafirme.eu — Romanian Companies Data
category: aggregator
institution: listafirme.eu (commercial)
country: RO
status: gated
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: api_key
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: true
pricing: pay_as_you_go
rate_limit: "credit-based (per-call credit consumption)"
official_docs: https://listafirme.eu/
api_base_url: https://listafirme.ro/api/
last_known_version: "v2 (listafirme.ro/api/ now redirects to a v3 spec page)"
mandatory_for_business: false
---

# listafirme.eu

## Overview

Commercial Romanian companies-data aggregator combining ONRC (registry), ANAF (VAT/financials), and BPI (Bulletin of Insolvency Proceedings). Operates on a credit-based model — each API call consumes credits depending on which sources are queried. Gated: requires account creation and credit pre-purchase. Strong choice when bulk historical financials are needed (vs free ANAF v9 which only gives current snapshot).

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `https://listafirme.ro/api/search-v2.asp` | Quick identification by name / CUI / registration number |
| POST | `https://listafirme.ro/api/info-v2.asp` | Exactly the fields you request (`data` JSON) for one CUI |
| POST | `https://listafirme.ro/api/firme-noi-v2.asp` | Newly registered companies for a date |

> Paths taken from the official API spec pages (`listafirme.eu/specificatii/api-info-v2.asp`, 2026 PDF). The old `api.listafirme.eu/v1/...` host no longer resolves (checked 2026-09-24).

## Authentication

Register at listafirme.eu → activate the API service and generate the key from the account form → send it as the `key` form parameter (`application/x-www-form-urlencoded`). GET also works for testing, but the vendor recommends POST in production so the key does not end up in logs.

## Request example

```bash
curl -X POST https://listafirme.ro/api/info-v2.asp \
  --data-urlencode 'key=YOUR_KEY' \
  --data-urlencode 'data={...fields you want for the CUI, see the spec...}'
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

- **Host moved (resolved 2026-09-24):** `api.listafirme.eu` no longer resolves (ENOTFOUND). The API now lives under `https://listafirme.ro/api/*.asp` per the vendor's spec pages. The spec pages and the PDF answer 403 to non-browser clients — read them in a browser.
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
- API spec v2: https://listafirme.eu/specificatii/api-info-v2.asp
- API presentation v2 (2026, PDF): https://listafirme.ro/ajutor/listafirme_api_presentation_info_v2_2026.pdf
- Last manual verification: 2026-05-27
- **Missing data**: full endpoint catalogue (gated behind login)
