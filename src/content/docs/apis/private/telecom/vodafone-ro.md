---
slug: vodafone-ro
title: Vodafone Romania (no public API)
category: telecom
institution: Vodafone România SA
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
official_docs: https://www.vodafone.ro
api_base_url: https://www.vodafone.ro
last_known_version: unknown
mandatory_for_business: false
---

# Vodafone Romania

## Overview

Vodafone Romania does **not publish a public developer portal** as of 2026-05-27. Global Vodafone group APIs (Vodafone Business, IoT, M2M) require enterprise contracts negotiated through account managers. There is no self-service Swagger, no sandbox, no developer signup. Compare with Orange RO which has CAMARA APIs publicly listed.

## Endpoints

None published.

## Authentication

N/A — contract & VPN access only.

## Request example

N/A.

## Response example

N/A.

## Existing SDKs / wrappers

None public.

## Testing approach

- [ ] Direct HTTP test
- [x] Playwright/Camoufox scraping fallback for self-care portal data (account-only)
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- No public developer portal — confirmed by manual check.
- Account self-care portal (`mvm.vodafone.ro`) is behind login and CAPTCHA.
- Enterprise IoT customers use SIM Management Platform with separate credentials.
- Vodafone may join CAMARA in future; monitor camaraproject.org for RO operator updates.

## Tutorial seeds (for content pipeline)

- "How to scrape Vodafone RO self-care invoices with Playwright as a fallback"
- "Vodafone vs Orange RO API readiness comparison"
- "Requesting enterprise IoT SIM Management access from Vodafone RO"

## ro-api-hub integration plan

- [ ] Catalogue stub (status=broken, no endpoints)
- [ ] Watch CAMARA project for RO joinup
- [ ] Provide scraping recipe as workaround
- [ ] MCP tool: stub only
- [ ] Code samples: scraping example

## References

- Public site: https://www.vodafone.ro
- CAMARA tracker: https://camaraproject.org/
- Last manual verification: 2026-05-27
