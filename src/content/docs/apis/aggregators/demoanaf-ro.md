---
slug: demoanaf-ro
title: demoanaf.ro — Modern REST Wrapper over ANAF (Redis-cached)
category: aggregator
institution: demoanaf.ro (community)
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: none
protocol: REST/JSON
openapi_spec: partial
sandbox_available: true
contract_required: false
pricing: free
rate_limit: "unknown (server-side, cache-friendly)"
official_docs: https://demoanaf.ro/api-docs
api_base_url: https://demoanaf.ro/api/
last_known_version: unknown
mandatory_for_business: false
---

# demoanaf.ro

## Overview

Modern Romanian REST/JSON wrapper over ANAF (VAT lookup + annual balance sheets) with Redis caching for sub-100ms responses. No auth, no quota friction, and Swagger-style docs at `/api-docs`. Functionally similar to what ro-api-hub aims to provide but narrower in scope (ANAF only). Notably also exposes historical balance-sheet data (`/balance/:year`) — a common need that direct ANAF endpoints don't satisfy easily.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://demoanaf.ro/api/company/{CUI}` | Company info (ANAF v9 mirror) |
| GET | `https://demoanaf.ro/api/balance/{CUI}/{YEAR}` | Annual balance sheet (Bilanț) |

## Authentication

None at this time (free, public).

## Request example

```bash
curl https://demoanaf.ro/api/company/14399840
curl https://demoanaf.ro/api/balance/14399840/2024
```

## Response example

```json
{
  "cui": 14399840,
  "denumire": "DEDEMAN SRL",
  "stare_inregistrare": "INREGISTRAT din data 28 Februarie 2002",
  "tva": true,
  "cached_at": "2026-05-27T08:12:00Z"
}
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | None official | — | OpenAPI/Swagger at `/api-docs` makes codegen trivial |

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [x] Sandbox — public endpoint is itself a sandbox
- [ ] Local simulator

## Known issues / gotchas

- Operator unknown — single point of failure for production
- Cache TTL not documented — fresh CUI registrations may lag ANAF v9
- No SLA / uptime commitment

## Tutorial seeds (for content pipeline)

- "Fetching Romanian balance sheets in 1 HTTP call (demoanaf.ro)"
- "Caching ANAF responses with Redis: demoanaf.ro as a reference architecture"
- "Building ro-api-hub: lessons from demoanaf.ro's design"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] Could fork/wrap as canonical SDK (if OSS) — confirm license
- [ ] Use as reference impl for ro-api-hub's own ANAF facade (Redis caching pattern)
- [ ] OpenAPI 3.1 spec — already partial via `/api-docs`, mirror into our docs
- [ ] MCP tool exposed via FastMCP (route to demoanaf.ro for balance-sheet history)

## References

- Docs: https://demoanaf.ro/api-docs
- Last manual verification: 2026-05-27
- **Missing data**: operator identity, license, cache TTL, rate limit, SLA
