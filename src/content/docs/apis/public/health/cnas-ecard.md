---
slug: cnas-ecard
title: eCard SDK (Romanian Health Card)
category: health
institution: Casa Națională de Asigurări de Sănătate (CNAS)
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: true
pricing: mandatory
rate_limit: unknown
official_docs: https://cnas.ro/cardul-national-de-asigurari-de-sanatate/
api_base_url: unknown
last_known_version: unknown
mandatory_for_business: true
---

# eCard SDK (Romanian Health Card)

## Overview

The Romanian National Health Insurance Card is read at the point of care via a smartcard reader connected to the provider's PC. CNAS distributes a Windows-native SDK (DLL) that medical-software products integrate with to authenticate the patient and validate insured status against SIUI. This is **not** an HTTP API — it's a local-device SDK consumed via PInvoke or COM from desktop applications.

Listed for completeness; programmatic interaction from a web server is not the use case.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| (DLL) | Windows native | Card read / PIN / patient auth |

No HTTP endpoints.

## Authentication

n/a at the SDK level (the cardholder's PIN authenticates against the card; provider auth is at the SIUI level).

## Request example

n/a — native DLL calls. Distributed to contracted providers; documentation is included in the SDK package.

## Response example

n/a

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| C/C++ | CNAS DLL | active | Reference |
| .NET | (community PInvoke wrappers, vendor-internal) | varies | Not centrally published |

## Testing approach

- [ ] Direct HTTP test (not applicable)
- [ ] Playwright needed (not applicable)
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [x] Local simulator: physical smartcard reader + test card from CNAS

## Known issues / gotchas

- **Windows-only DLL** — no native Linux/macOS support
- Requires a CNAS-approved smartcard reader (typically PC/SC)
- Cards have a chip lifetime; expired cards must be reissued
- For online insurance status without a physical card, use the `cnas-asigurat-status` web service / portal

## Tutorial seeds (for content pipeline)

- "Integrating the Romanian eCard SDK into a .NET clinic app"
- "Choosing a PC/SC reader for Romanian health-card workflows"

## ro-api-hub integration plan

- [ ] Catalogue entry as a local-SDK reference (not a remote API)
- [ ] Link to vendor wrappers
- [ ] No HTTP wrapper (not applicable)

## References

- CNAS card page: https://cnas.ro/cardul-national-de-asigurari-de-sanatate/
- Last manual verification: 2026-05-27
