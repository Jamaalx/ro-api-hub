---
slug: ppc-enel
title: PPC (ex-Enel) / Rețele Electrice (no public API)
category: energy
institution: PPC Romania (formerly Enel) / Rețele Electrice (DSO)
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
official_docs: https://www.ppcenergy.ro/
api_base_url: https://www.ppcenergy.ro/
last_known_version: unknown
mandatory_for_business: false
---

# PPC (ex-Enel) / Rețele Electrice

## Overview

PPC Romania (the rebrand of Enel Romania after acquisition by Public Power Corporation of Greece) and its DSO Rețele Electrice do **not publish a public consumer / B2B API** for electricity consumption, billing, prosumer or invoice data. Customer self-care is web/app-only. Smart-meter readings are available to the consumer through the portal but not via REST.

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

- **Site moved (resolved 2026-09-24):** `www.ppcgroup.com/ro` answers **HTTP 500** (server error page, not a bot block). The Romanian customer site of PPC (ex-Enel) is **`https://www.ppcenergy.ro/`**, which replaced enel.ro on 2024-04-10; the customer app is myPPC. Still no public API.
- No public API — verified 2026-05-27.
- Self-care portal requires login + 2FA.
- Prosumer settlement data only via PDF invoices.
- Network operator data (Rețele Electrice) similarly closed.
- Compliance: any scraping of personal consumption data requires explicit user consent (GDPR + ANRE Order 174/2020).

## Tutorial seeds (for content pipeline)

- "How to scrape PPC Romania self-care invoices with Playwright as fallback (consent-based)"
- "Reading prosumer settlements from PDF when no API exists"
- "Why RO electricity DSOs lag behind EU peers on open data"

## ro-api-hub integration plan

- [ ] Catalogue stub (status=broken)
- [ ] Scraping recipe (consent-based)
- [ ] Monitor for Smart Meter Gateway / ANRE Order on open data
- [ ] No MCP tool until official endpoints exist

## References

- Public site: https://www.ppcenergy.ro/ (replaced enel.ro on 2024-04-10)
- Group site (answered 500 on 2026-09-24): https://www.ppcgroup.com/ro
- DSO: https://www.reteleelectrice.ro/
- PPC — brand history (acquisition of Enel RO): https://www.ppcenergy.ro/info-utile/achizitia-operatiunilor-grupul-ppc/
- Last manual verification: 2026-05-27
