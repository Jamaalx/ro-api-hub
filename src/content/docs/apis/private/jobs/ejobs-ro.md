---
slug: ejobs-ro
title: eJobs.ro (no public API)
category: jobs
institution: eJobs Group
country: RO
status: broken
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: true
pricing: enterprise
rate_limit: unknown
official_docs: https://www.ejobs.ro
api_base_url: https://www.ejobs.ro
last_known_version: unknown
mandatory_for_business: false
---

# eJobs.ro (no public API)

## Overview

eJobs.ro is one of the largest RO job boards, but it does **not publish a public REST API**. Integrations for employers are dashboard-only (post job, manage candidates) or via account-manager XML feed agreements for HR systems. Third parties typically use peviitor.ro aggregator or web scraping.

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
| RSS | partial company feeds | partial | Not full coverage |

## Testing approach

- [ ] Direct HTTP test
- [x] Playwright/Camoufox scraping fallback
- [x] Browser UA spoof needed (anti-bot)
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- **Blocks bots, verified manually 2026-09-24:** the link checker gets HTTP 403 (Cloudflare "Just a moment…" challenge); the page exists for a human browser (Cloudflare JS challenge — passes in a normal browser). Not a dead link — keep it.
- No documented public API — verified 2026-05-27.
- Site uses anti-bot (Cloudflare/Akamai); requires Camoufox or rotating proxies.
- ToS prohibits unauthorized scraping at scale.
- For aggregator use cases, prefer peviitor.ro (free, open-source).

## Tutorial seeds (for content pipeline)

- "How to scrape eJobs.ro with Playwright as fallback (consent-based)"
- "eJobs vs BestJobs vs peviitor for hiring-funnel analytics"
- "Requesting eJobs XML feed access from sales team"

## ro-api-hub integration plan

- [ ] Catalogue stub (status=broken)
- [ ] Scraping recipe (Playwright/Camoufox)
- [ ] Recommend peviitor.ro as legal alternative
- [ ] No MCP tool until official API exists

## References

- Public site: https://www.ejobs.ro
- Alternative: https://github.com/peviitor-ro/api
- Last manual verification: 2026-05-27
