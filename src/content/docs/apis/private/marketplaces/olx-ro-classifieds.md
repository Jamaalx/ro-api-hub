---
slug: olx-ro-classifieds
title: OLX Romania Classifieds (no public API)
category: marketplaces
institution: OLX Group (Prosus / Naspers)
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
official_docs: https://www.olx.ro
api_base_url: https://www.olx.ro
last_known_version: unknown
mandatory_for_business: false
---

# OLX Romania Classifieds (no public API)

## Overview

OLX Romania's general classifieds platform (excluding the Real Estate vertical, which is Storia / OLX Group RE) does **not expose a public developer API** as of 2026-05-27. The OLX Group developer portal at developer.olxgroup.com covers Real Estate only. Sellers and aggregators using OLX RO classifieds rely on the seller dashboard UI or third-party scraping.

## Endpoints

None published for OLX RO classifieds.

## Authentication

N/A.

## Request example

N/A.

## Response example

N/A.

## Existing SDKs / wrappers

None official.

## Testing approach

- [ ] Direct HTTP test
- [x] Playwright/Camoufox scraping fallback for listings & ad detail
- [x] Browser UA spoof needed (Cloudflare protection)
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- olx.ro fronted by Cloudflare with bot detection — vanilla curl gets 403.
- Mobile app uses internal GraphQL endpoints, not documented for third parties; reverse-engineering risks ToS violations.
- For Real Estate use the separate OLX Group RE API (see `olx-storia-re.md`).
- Lead-management for business sellers is dashboard-only.

## Tutorial seeds (for content pipeline)

- "How to scrape OLX RO with Playwright + Camoufox respecting ToS"
- "OLX RO vs Storia: when to use the public Group API"
- "Building an OLX RO listing monitor with HTML parsing"

## ro-api-hub integration plan

- [ ] Catalogue stub (status=broken)
- [ ] Scraping recipe (Playwright/Camoufox)
- [ ] Monitor for OLX RO classifieds API release
- [ ] No MCP tool until official endpoints exist
- [ ] Code samples: scraping example

## References

- Public site: https://www.olx.ro
- OLX Group dev portal (RE only): https://developer.olxgroup.com/
- Last manual verification: 2026-05-27
