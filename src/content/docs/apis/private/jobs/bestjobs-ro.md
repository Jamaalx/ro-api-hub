---
slug: bestjobs-ro
title: BestJobs.ro (no public API)
category: jobs
institution: BestJobs Recruitment SRL
country: RO
status: broken
verified_at: 2026-05-27
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: true
pricing: enterprise
rate_limit: unknown
official_docs: https://www.bestjobs.eu
api_base_url: https://www.bestjobs.eu
last_known_version: unknown
mandatory_for_business: false
---

# BestJobs.ro (no public API)

## Overview

BestJobs.ro (corporate domain `bestjobs.eu`) is a top-3 Romanian job board with strong WhatsApp / chat-based candidate flow. There is **no public REST API**. Employer integrations are dashboard-only or via custom feed agreements for ATS vendors. Third-party use relies on peviitor.ro aggregator or scraping.

## Endpoints

None published.

## Authentication

N/A.

## Request example

N/A.

## Response example

N/A.

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Apify | community actors | active | Web scraping |
| ATS | enterprise feeds | partial | Custom contracts |

## Testing approach

- [ ] Direct HTTP test
- [x] Playwright/Camoufox scraping fallback
- [x] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- No documented public API — verified 2026-05-27.
- Anti-bot protection on listing pages.
- Mobile app uses internal endpoints; reverse-engineering risks ToS.
- For aggregation, prefer peviitor.ro.

## Tutorial seeds (for content pipeline)

- "How to scrape BestJobs.ro with Playwright as fallback (consent-based)"
- "BestJobs WhatsApp candidate funnel — opportunities for HR SaaS"
- "Requesting BestJobs ATS feed access"

## ro-api-hub integration plan

- [ ] Catalogue stub (status=broken)
- [ ] Scraping recipe (Playwright/Camoufox)
- [ ] Recommend peviitor.ro alternative
- [ ] No MCP tool until official API exists

## References

- Public site: https://www.bestjobs.eu
- Alternative: https://github.com/peviitor-ro/api
- Last manual verification: 2026-05-27
