---
slug: seap-sicap
title: SEAP / SICAP — e-licitație
category: procurement
institution: ANAP / ADR (operator SICAP)
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: basic_auth
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: unknown
official_docs: https://www.e-licitatie.ro/pub
api_base_url: https://www.e-licitatie.ro/
last_known_version: "n/a"
mandatory_for_business: false
---

# SEAP / SICAP — e-licitație

## Overview

SEAP (now SICAP) is the Romanian electronic public procurement system — the mandatory platform for tenders, contract awards, and direct purchases by public buyers. The public face at `e-licitatie.ro/pub` allows searching published notices, awards, and direct acquisitions. Bidder accounts (with digital certificate) participate in tenders. The portal is heavily JavaScript-rendered; there is no published REST API for bulk extraction, though parallel OCDS-format publication is in progress (see RO0046 commitment). Some BI tools (DataLicitatii etc.) scrape via Playwright.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://www.e-licitatie.ro/pub` | Public search UI |
| GET | `https://www.e-licitatie.ro/pub/notices/contract-notices/list/0/` | Notices list (JS-rendered) |

## Authentication

- Public search: none.
- Bidder participation: account + qualified digital certificate.

## Request example

JS-rendered — no direct HTTP.

```bash
# Returns empty SPA shell
```

## Response example

HTML / dynamic JS state.

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | various commercial BI tools | varies | DataLicitatii, eufunds.ro, etc. — scrape internally |
| — | OCDS feed (in progress) | partial | See RO0046 entry |

## Testing approach

- [ ] Direct HTTP test (curl / fetch) — empty SPA
- [x] Playwright needed (JS-rendered)
- [x] Browser UA spoof recommended
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- Entire portal is JS-rendered — Playwright/Puppeteer needed.
- No published REST API; ToS restricts automated scraping.
- OCDS pilot is the only structured machine-readable path (still partial).
- Bidder flows require qualified certificate at signature time.

## Tutorial seeds (for content pipeline)

- "Cum monitorizezi noile licitații publice fără să încalci ToS SICAP"
- "OCDS RO: cum citești formatul standardizat pentru achiziții"

## ro-api-hub integration plan

- [ ] Catalogue entry noting JS-only + OCDS partial alternative
- [ ] Prefer OCDS feed integration over scraping
- [ ] Playwright-based scraper only as last resort, respecting ToS

## References

- Portal: https://www.e-licitatie.ro/pub
- OCDS commitment: https://www.opengovpartnership.org/members/romania/commitments/RO0046/
- Last manual verification: 2026-05-27
