---
slug: rar-auto-pass
title: RAR Auto Pass / Istoric Vehicul
category: transport
institution: Registrul Auto Român (RAR)
country: RO
status: suspended
verified_at: 2026-05-27
auth: basic_auth
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: pay_as_you_go
rate_limit: unknown
official_docs: https://pro.rarom.ro/istoric_vehicul/dosar_vehicul.aspx
api_base_url: https://pro.rarom.ro/istoric_vehicul/
last_known_version: "n/a"
mandatory_for_business: false
---

# RAR Auto Pass / Istoric Vehicul

> **STATUS: SUSPENDED (verified 2026-05-27).** The portal currently displays the notice: *"accesul la aplicația Istoric Vehicul este suspendat"*. No timeline is published for restoration. Originally mandated since December 2024 for second-hand vehicle sales.

## Overview

RAR (Romanian Auto Register) Auto Pass / Istoric Vehicul was a PDF report (42 lei) summarising a vehicle's technical inspection history, prior ownership transfers, mileage records, and insurance/registration events, generated from RAR's internal records and EUCARIS cross-border data. Mandated by law since Dec 2024 for second-hand sales. As of verification date the service is **suspended** and there is no documented public API — historically access was via web report ordering.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://pro.rarom.ro/istoric_vehicul/dosar_vehicul.aspx` | Report ordering form (suspended) |

## Authentication

Web account + online payment (when active).

## Request example

n/a — service suspended.

```bash
# Currently returns suspension notice
```

## Response example

n/a

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | — | — | None known |

## Testing approach

- [ ] Direct HTTP test (curl / fetch) — only returns suspension notice
- [x] Playwright needed (JS-rendered page when active)
- [x] Browser UA spoof recommended
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- **Service suspended** as of 2026-05-27 — no timeline for restoration.
- PDF-only delivery historically; no JSON API ever published.
- Mandatory-for-sale status created scraping pressure that may have triggered the suspension.

## Tutorial seeds (for content pipeline)

- "Ce facem cât timp RAR Auto Pass este suspendat: alternative de due diligence"
- "EUCARIS și verificarea istoricului unui vehicul — surse europene"

## ro-api-hub integration plan

- [ ] Catalogue entry marked SUSPENDED
- [ ] Monitor RAR communications for restoration
- [ ] No wrapper while down

## References

- Portal (suspended): https://pro.rarom.ro/istoric_vehicul/dosar_vehicul.aspx
- RAR: https://www.rarom.ro/
- Last manual verification: 2026-05-27
