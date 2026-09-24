---
slug: onrc-recom
title: RECOM Online (ONRC)
category: registry
institution: Oficiul Național al Registrului Comerțului (ONRC)
country: RO
status: gated
verified_at: 2026-05-27
auth: contract
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: true
pricing: subscription
rate_limit: unknown
official_docs: https://portal.onrc.ro/
api_base_url: https://portal.onrc.ro/
last_known_version: unknown
mandatory_for_business: false
---

# RECOM Online (ONRC)

## Overview

RECOM Online is the National Trade Register Office's commercial-data portal, providing access to company records (status, capital, shareholders, financials, branches). The historical `www.onrc.ro` host currently shows a "Site under construction!" banner with stale 2020–2021 news; the live portal is `portal.onrc.ro`. Bulk programmatic access requires a paid subscription contract with ONRC.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://portal.onrc.ro/` | Live portal |
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

- **Link check 2026-09-24:** `official_docs` https://portal.onrc.ro/ → ENOTFOUND (twice, ≥30 s apart). Needs a human to find the new URL.
- **`www.onrc.ro` shows a "Site under construction!" banner** with news items dated 2020–2021 — do **not** treat it as authoritative. Use `portal.onrc.ro` instead.
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

- Live portal: https://portal.onrc.ro/
- Stale landing: https://www.onrc.ro/
- Open datasets (separate entry): https://data.gov.ro/organization/onrc
- Last manual verification: 2026-05-27
