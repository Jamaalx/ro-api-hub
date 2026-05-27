---
slug: hidroelectrica
title: Hidroelectrica (no API)
category: energy
institution: SPEEH Hidroelectrica SA
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
official_docs: https://www.hidroelectrica.ro
api_base_url: https://www.hidroelectrica.ro
last_known_version: unknown
mandatory_for_business: false
---

# Hidroelectrica (no API)

## Overview

Hidroelectrica, the largest Romanian electricity producer (hydro), also operates a retail furnizor business. It does **not publish a public consumer / B2B REST API**. Customer self-care is web-only. Generation data is partly available via Transelectrica's SCADA pages and ENTSO-E Transparency Platform.

## Endpoints

None published.

## Authentication

N/A.

## Request example

N/A.

## Response example

N/A.

## Existing SDKs / wrappers

None.

## Testing approach

- [ ] Direct HTTP test
- [x] Playwright/Camoufox scraping fallback for self-care
- [x] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- No public API — verified 2026-05-27.
- For hydro generation data, use ENTSO-E Transparency or Transelectrica SCADA HTML.
- Retail self-care portal requires login.
- Compliance: consumption data requires user consent.

## Tutorial seeds (for content pipeline)

- "How to scrape Hidroelectrica self-care invoices with Playwright (consent-based)"
- "Pulling hydro generation data from ENTSO-E Transparency instead"
- "Mapping Hidroelectrica hydropower plants from public sources"

## ro-api-hub integration plan

- [ ] Catalogue stub (status=broken)
- [ ] Document ENTSO-E + Transelectrica as alternatives
- [ ] Scraping recipe (consent-based)
- [ ] No MCP tool until official endpoints exist

## References

- Public site: https://www.hidroelectrica.ro
- ENTSO-E Transparency: https://transparency.entsoe.eu/
- Transelectrica: https://www.transelectrica.ro
- Last manual verification: 2026-05-27
