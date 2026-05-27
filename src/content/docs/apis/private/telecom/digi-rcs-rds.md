---
slug: digi-rcs-rds
title: Digi / RCS-RDS (no public API)
category: telecom
institution: RCS & RDS SA (Digi Communications NV)
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
official_docs: https://www.digi.ro
api_base_url: https://www.digi.ro
last_known_version: unknown
mandatory_for_business: false
---

# Digi / RCS-RDS

## Overview

Digi (RCS & RDS) does **not publish a public developer portal**. The customer self-care portal (digi.ro / mobil.digi.ro) is account-only with no documented REST API. No CAMARA membership at time of writing. Largest RO ISP/mobile by subscribers but zero developer ecosystem.

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
- [x] Playwright/Camoufox scraping fallback for self-care portal
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- No public developer portal — confirmed by manual check.
- mobil.digi.ro uses CSRF tokens and 2FA, hard to scrape headlessly.
- Cable TV channel listings are public but only via HTML scrape.
- Digi mobile in IT/ES/PT/BE uses same group but no shared API.

## Tutorial seeds (for content pipeline)

- "Scraping Digi mobile invoices with Playwright (consent-based)"
- "How to monitor Digi outages using community status pages"
- "Why Romanian telcos lag behind Orange on developer APIs"

## ro-api-hub integration plan

- [ ] Catalogue stub (status=broken)
- [ ] Scraping recipe (consent-based) for self-care
- [ ] Monitor for CAMARA join
- [ ] MCP tool: stub only
- [ ] Code samples: scraping example

## References

- Public site: https://www.digi.ro
- Digi Group investor page: https://www.digi-communications.ro/
- Last manual verification: 2026-05-27
