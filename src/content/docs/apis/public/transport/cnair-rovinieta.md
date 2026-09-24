---
slug: cnair-rovinieta
title: CNAIR Verificare Rovinietă
category: transport
institution: Compania Națională de Administrare a Infrastructurii Rutiere (CNAIR)
country: RO
status: broken
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: unknown
official_docs: https://www.cnadnr.ro/ro/verificare-rovinieta
api_base_url: https://www.erovinieta.ro/
last_known_version: "n/a"
mandatory_for_business: false
---

# CNAIR Verificare Rovinietă

## Overview

CNAIR (the national road infrastructure administrator) historically offered a public form for checking whether a vehicle has a valid rovinietă (road usage vignette). The dedicated CNAIR check page now redirects users to `erovinieta.ro`, which is the operational platform run by CNAIR's delegated operator. There is no documented public API for verification — only a web form intended for end users.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://www.cnadnr.ro/ro/verificare-rovinieta` | Landing page, redirects to erovinieta.ro |
| GET | `https://www.erovinieta.ro/check` | Web form for plate lookup (interactive) |

## Authentication

None for the public form (CAPTCHA is required in-browser).

## Request example

No documented API — interactive form only.

```bash
# Not applicable — JS-rendered form with CAPTCHA
```

## Response example

HTML page only.

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | — | — | No known public SDK |

## Testing approach

- [ ] Direct HTTP test (curl / fetch)
- [x] Playwright needed (JS-rendered page)
- [x] Browser UA spoof needed (WAF blocks default UA)
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- **Blocks bots, verified manually 2026-09-24:** the link checker gets HTTP 503 ("Verifying your browser…"); the page exists for a human browser (JavaScript browser-verification interstitial; the page is indexed as "Verificare Rovinieta | CNAIR" and erovinieta.ro answers 200). Not a dead link — keep it.
- CNAIR landing page does not expose a check endpoint; it bounces to erovinieta.ro.
- erovinieta.ro returns HTTP 403 to non-browser User-Agents (WAF).
- CAPTCHA on the form prevents straightforward scraping.
- No documented JSON API — any automation is unofficial reverse-engineering.

## Tutorial seeds (for content pipeline)

- "Verificare rovinietă programatic: limitări legale și tehnice"
- "Alternative oficiale pentru integrarea verificării roviniete (contract distribuitor)"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site (documenting unavailability)
- [ ] Link to erovinieta merchant-integration as the only legitimate path
- [ ] No wrapper — recommend contract route

## References

- Official page: https://www.cnadnr.ro/ro/verificare-rovinieta
- Operator: https://www.erovinieta.ro/
- Last manual verification: 2026-05-27
