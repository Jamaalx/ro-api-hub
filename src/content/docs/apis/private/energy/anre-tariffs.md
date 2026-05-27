---
slug: anre-tariffs
title: ANRE Tariff Comparator (web only, no API)
category: energy
institution: ANRE — Autoritatea Națională de Reglementare în Domeniul Energiei
country: RO
status: broken
verified_at: 2026-05-27
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: unknown
official_docs: https://www.anre.ro
api_base_url: https://www.anre.ro
last_known_version: unknown
mandatory_for_business: false
---

# ANRE Tariff Comparator (web only, no API)

## Overview

ANRE (the RO energy regulator) operates a public tariff comparator for electricity and natural gas suppliers (`comparator.anre.ro`). It is **web-only** — there is no documented public REST API or bulk download endpoint. Decisions, regulated prices and supplier lists are published as PDFs/HTML. Data extraction requires scraping.

## Endpoints

None published as API.

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
- [x] Playwright/Camoufox scraping fallback for comparator results
- [ ] Browser UA spoof needed (mild bot detection)
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- Comparator results depend on consumption profile (kWh/year, voltage, region) — must submit form before scraping.
- PDFs of ANRE decisions change format occasionally.
- Supplier list updated by ANRE periodically; no diff feed.
- ANRE has published Orders mandating open data but implementation lags.

## Tutorial seeds (for content pipeline)

- "How to scrape ANRE tariff comparator with Playwright as fallback"
- "Parsing ANRE PDF decisions for regulated price changes"
- "Building a daily RO electricity / gas tariff alert from ANRE scrape"

## ro-api-hub integration plan

- [ ] Catalogue stub (status=broken)
- [ ] Scraping recipe (Playwright/Camoufox)
- [ ] Mirror PDFs nightly with diffing
- [ ] No MCP tool until official endpoints exist

## References

- ANRE site: https://www.anre.ro
- Comparator: https://comparator.anre.ro/
- Last manual verification: 2026-05-27
