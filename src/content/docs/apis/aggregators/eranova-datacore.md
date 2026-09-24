---
slug: eranova-datacore
title: eranova-digital/datacore — REST Cache Proxy over ANAF
category: aggregator
institution: eranova-digital (open-source)
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: none
protocol: REST/JSON
openapi_spec: partial
sandbox_available: false
contract_required: false
pricing: free
rate_limit: "self-hosted (depends on deployment)"
official_docs: https://github.com/eranova-digital/datacore
api_base_url: https://YOUR_DEPLOYMENT/
last_known_version: "(last commit 2025-11-05)"
mandatory_for_business: false
---

# eranova-digital/datacore

## Overview

Open-source REST cache proxy over ANAF (and possibly other RO public data) maintained by eranova-digital. Last commit 2025-11-05 — active. Architecturally similar to demoanaf.ro and ro-api-hub's planned facade: thin REST layer + cache + retry on flaky upstreams. Self-hostable, which makes it a strong reference implementation.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://YOUR_DEPLOYMENT/anaf/{CUI}` | ANAF v9 mirror (typical) |
| GET | `https://YOUR_DEPLOYMENT/...` | Other proxied endpoints per repo config |

> Exact endpoint catalogue per repo README.

## Authentication

None (self-hosted; add your own gateway if needed).

## Request example

```bash
git clone https://github.com/eranova-digital/datacore
docker compose up
curl http://localhost:PORT/anaf/14399840
```

## Response example

```json
{ "cui": 14399840, "denumire": "...", "cached_at": "..." }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | None | — | Self-hosted; consume via plain HTTP |

## Testing approach

- [x] Direct HTTP test
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [x] Sandbox — run locally
- [x] Local simulator: clone + docker compose

## Known issues / gotchas

- Not a hosted public API — must self-host
- License + production-readiness to verify in repo
- Last commit 2025-11-05 — actively maintained but no major release tags

## Tutorial seeds (for content pipeline)

- "Self-host an ANAF cache proxy with eranova-digital/datacore"
- "Cache-invalidation strategy for slowly-changing RO public data"
- "datacore vs demoanaf.ro vs ro-api-hub facade: pick your weapon"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] Use as reference impl for ro-api-hub's caching layer
- [ ] Could fork/wrap as canonical SDK — evaluate license + arch fit
- [ ] Compare cache key + TTL design choices

## References

- Repo: https://github.com/eranova-digital/datacore
- Last commit: 2025-11-05
- Last manual verification: 2026-05-27
- **Missing data**: full endpoint list, license, production deployments
