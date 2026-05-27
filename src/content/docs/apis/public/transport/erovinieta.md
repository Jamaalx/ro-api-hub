---
slug: erovinieta
title: erovinieta — Cumpărare și verificare rovinietă
category: transport
institution: CNAIR (operator delegat erovinieta)
country: RO
status: gated
verified_at: 2026-05-27
auth: contract
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: true
pricing: pay_as_you_go
rate_limit: unknown
official_docs: https://www.erovinieta.ro/
api_base_url: https://www.erovinieta.ro/
last_known_version: "n/a"
mandatory_for_business: false
---

# erovinieta — Cumpărare și verificare rovinietă

## Overview

erovinieta.ro is the official platform delegated by CNAIR for selling and verifying the Romanian road vignette (rovinietă) and peage (TVA, TPV). End-users buy directly via the web/app. Programmatic access (distributor integration) exists only via merchant agreement with CNAIR/operator — there is no public REST API. The site is fronted by a WAF that returns HTTP 403 to default automated User-Agents.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://www.erovinieta.ro/` | Public portal (web) |
| — | (private merchant API) | Distributor integration, contract-only |

## Authentication

- End-user: account login + payment (card / Apple Pay / Google Pay).
- Distributor: merchant credentials issued under contract; integration spec delivered privately.

## Request example

Not publicly documented.

```bash
# No public API
```

## Response example

n/a

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | — | — | None — merchant contract only |

## Testing approach

- [ ] Direct HTTP test (curl / fetch)
- [x] Playwright needed (JS-rendered page)
- [x] Browser UA spoof needed (WAF blocks default UA — HTTP 403)
- [ ] Sandbox available (contract only)
- [ ] Local simulator

## Known issues / gotchas

- WAF blocks non-browser User-Agents (HTTP 403 confirmed 2026-05-27).
- No public API specification.
- Distributor integration requires a signed contract; technical docs are NDA.

## Tutorial seeds (for content pipeline)

- "Cum devii distribuitor erovinieta: pași contractuali și tehnici"
- "Integrare rovinietă într-o aplicație de mobilitate: alternative legale"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site (documenting contract-only status)
- [ ] No wrapper — link to contractual onboarding

## References

- Portal: https://www.erovinieta.ro/
- CNAIR: https://www.cnadnr.ro/
- Last manual verification: 2026-05-27
