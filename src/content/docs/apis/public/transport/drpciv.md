---
slug: drpciv
title: DRPCIV — Direcția Regim Permise de Conducere și Înmatriculare a Vehiculelor
category: transport
institution: DRPCIV (MAI)
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: unknown
official_docs: https://dgpci.mai.gov.ro/drpciv-forms/vehicle
api_base_url: https://dgpci.mai.gov.ro/
last_known_version: "n/a"
mandatory_for_business: false
---

# DRPCIV — Înmatriculări și programări

## Overview

DRPCIV is the MAI directorate handling vehicle registration and driver licensing in Romania. The public interface offers online appointment scheduling and forms for vehicle registration. No official public API exists; the portal is a JavaScript-rendered SPA that requires browser automation for any programmatic interaction. A community scraper (`vgoutdev/programare_drpciv`) existed but has been abandoned since 2020.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://dgpci.mai.gov.ro/drpciv-forms/vehicle` | Vehicle registration forms (SPA) |
| GET | `https://dgpci.mai.gov.ro/programari/` | Appointment scheduling (SPA) |

## Authentication

None for forms; appointment booking may require ID + email confirmation.

## Request example

JS-rendered — requires headless browser.

```bash
# Not directly callable via curl
```

## Response example

HTML / dynamic JS state.

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Python | `vgoutdev/programare_drpciv` | stale (2020-12-17) | Abandoned appointment scraper |

## Testing approach

- [ ] Direct HTTP test (curl / fetch) — empty (JS-only)
- [x] Playwright needed (JS-rendered SPA)
- [x] Browser UA spoof recommended
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- Entire portal is JavaScript-rendered; raw HTTP fetch returns empty shell.
- No official API; only forms intended for human users.
- Appointment slots fill rapidly; any scraping must respect MAI terms.

## Tutorial seeds (for content pipeline)

- "Cum monitorizezi programările DRPCIV cu Playwright (etic)"
- "Status-ul oficial al unei înmatriculări — surse alternative legale"

## ro-api-hub integration plan

- [ ] Catalogue entry noting JS-only + no API
- [ ] Optional Playwright-based wrapper for appointment availability (only if MAI permits)
- [ ] Document the abandoned `vgoutdev` scraper as historical reference

## References

- Forms: https://dgpci.mai.gov.ro/drpciv-forms/vehicle
- MAI: https://www.mai.gov.ro/
- Community scraper (stale): https://github.com/vgoutdev/programare_drpciv
- Last manual verification: 2026-05-27
