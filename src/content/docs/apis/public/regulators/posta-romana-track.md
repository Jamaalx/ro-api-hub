---
slug: posta-romana-track
title: Poșta Română — Track & Trace
category: regulators
institution: Compania Națională Poșta Română (CNPR)
country: RO
status: active
verified_at: 2026-05-27
auth: contract
protocol: REST/JSON
openapi_spec: false
sandbox_available: true
contract_required: true
pricing: pay_as_you_go
rate_limit: unknown
official_docs: https://awb.posta-romana.ro/
api_base_url: https://awb.posta-romana.ro/
last_known_version: "n/a"
mandatory_for_business: false
---

# Poșta Română — Track & Trace

## Overview

Poșta Română's `awb.posta-romana.ro` is the public AWB tracking portal — anyone can paste a tracking number and see the latest shipment status. For programmatic access (B2B integration: bulk tracking, label generation, shipment creation), Poșta Română offers a contracted API issued under commercial agreement (typically with a courier-aggregator account). There is no documented free public REST API for tracking.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://awb.posta-romana.ro/` | Public AWB tracking form |
| — | (private B2B API) | Track, create shipments, print AWB — contract only |

## Authentication

- Public form: none (CAPTCHA may apply).
- B2B: account-issued credentials under contract.

## Request example

```bash
# Public form is interactive; no direct REST.
# For B2B, request integration docs from posta-romana.ro after signing.
```

## Response example

HTML for public tracking; JSON/XML for B2B (per contract spec).

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | various courier aggregators (Sameday, Sendcloud-style) | varies | Resell tracking under their own API |

## Testing approach

- [ ] Direct HTTP test (curl / fetch) — form-only
- [x] Playwright needed (form + CAPTCHA)
- [x] Browser UA spoof recommended
- [x] Sandbox available (per contract)
- [ ] Local simulator

## Known issues / gotchas

- No free public REST API for tracking — relying on form scraping risks CAPTCHA + ToS issues.
- B2B integration requires signed agreement and minimum volumes typically.
- For multi-courier projects, aggregators (Sameday, etc.) are often a cleaner integration path.

## Tutorial seeds (for content pipeline)

- "Tracking Poșta Română legal: aggregator vs scraping"
- "Cum semnezi contract de integrare CNPR pentru un eShop"

## ro-api-hub integration plan

- [ ] Catalogue entry noting contract-only
- [ ] Document partner aggregator alternatives
- [ ] No public wrapper

## References

- Public tracking: https://awb.posta-romana.ro/
- CNPR: https://www.posta-romana.ro/
- Last manual verification: 2026-05-27
