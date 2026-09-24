---
slug: onrc-recom
title: RECOM Online (ONRC)
category: registry
institution: Oficiul Național al Registrului Comerțului (ONRC)
country: RO
status: gated
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: contract
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: true
pricing: subscription
rate_limit: unknown
official_docs: https://myportal.onrc.ro/
api_base_url: https://myportal.onrc.ro/
last_known_version: unknown
mandatory_for_business: false
---

# RECOM Online (ONRC)

## Overview

RECOM Online is the National Trade Register Office's commercial-data portal, providing access to company records (status, capital, shareholders, financials, branches). The online-services portal moved from `portal.onrc.ro` (no longer resolves) to `myportal.onrc.ro`; RECOM Online (furnizare informații) is reached from an account there. Bulk programmatic access requires a paid subscription contract with ONRC.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://myportal.onrc.ro/` | Live portal (account login; RECOM = "furnizare informații") |
| GET | `https://www.onrc.ro/` | Stale landing ("Site under construction!") |

Programmatic endpoints are exposed under contract; not publicly documented.

## Authentication

Paid account / institutional contract with ONRC.

## Request example

n/a — gated. Most third parties consume RECOM indirectly via aggregators (listafirme.eu, openapi.ro, alertacui.ro, incorpo.ro MCP).

## Response example

n/a

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| (aggregator) | `listafirme.eu` | active | ONRC + ANAF + BPI wrapper |
| (aggregator) | `openapi.ro` | active | Free 100/mo, paid tiers |
| (aggregator) | `alertacui.ro` | active | Subscription monitoring |
| MCP | `incorpo.ro` MCP Romania | active 2026 | `https://mcp.incorpo.ro/mcp`, ONRC + ANAF + MJ |

## Testing approach

- [ ] Direct HTTP test
- [x] Playwright needed for UI flows
- [x] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- **Portal moved (resolved 2026-09-24):** `portal.onrc.ro` no longer resolves; ONRC's own site (www.onrc.ro) points to **`myportal.onrc.ro`** for all online services, incl. RECOM (contact recom@onrc.ro).
- `www.onrc.ro` now carries current news (2026) and links to `myportal.onrc.ro` as the online-services portal.
- Bulk access is paid — free tiers exist only via third-party aggregators
- WAF-protected — automation requires realistic UA + cookie handling

## Tutorial seeds (for content pipeline)

- "RECOM vs. open-data ONRC: when to use which"
- "Building a CUI-to-company resolver via openapi.ro + listafirme.eu"

## ro-api-hub integration plan

- [ ] Catalogue entry with the "site under construction" warning
- [ ] Aggregator-routing wrapper (openapi.ro → listafirme.eu → fallback)
- [ ] MCP tool that falls through to incorpo.ro MCP when available

## References

- Live portal: https://myportal.onrc.ro/ (guide: https://myportal.onrc.ro/guide)
- Stale landing: https://www.onrc.ro/
- Open datasets (separate entry): https://data.gov.ro/organization/onrc
- ONRC homepage (links to myportal): https://www.onrc.ro/index.php/ro/
- Last manual verification: 2026-05-27
