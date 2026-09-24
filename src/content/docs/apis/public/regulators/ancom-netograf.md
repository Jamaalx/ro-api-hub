---
slug: ancom-netograf
title: ANCOM Netograf — Hartă servicii electronice
category: regulators
institution: Autoritatea Națională pentru Administrare și Reglementare în Comunicații (ANCOM)
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
official_docs: https://www.netograf.ro/about
api_base_url: https://www.netograf.ro/
last_known_version: "n/a"
mandatory_for_business: false
---

# ANCOM Netograf

## Overview

Netograf is ANCOM's public platform for measuring and visualizing the quality of internet services (broadband, mobile) in Romania. Users run speed tests via a dedicated app, and aggregated statistics are published on the site as interactive maps and charts. The frontend is JavaScript-rendered; an underlying JSON API may exist but is undocumented. ANCOM also publishes operator registers and complaint statistics elsewhere on ancom.ro.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://www.netograf.ro/` | Public map/portal (SPA) |
| GET | `https://www.netograf.ro/about` | About / methodology |

## Authentication

None for public stats; speed tests submitted via the Netograf mobile app.

## Request example

JS-rendered — direct fetch returns empty shell.

```bash
# Needs Playwright
```

## Response example

n/a directly; map tiles + JSON loaded by the SPA.

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | — | — | None known |

## Testing approach

- [ ] Direct HTTP test (curl / fetch) — empty
- [x] Playwright needed (JS-rendered)
- [x] Browser UA spoof recommended
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- Entire site is SPA — no direct HTML payload to scrape.
- API endpoints used by the SPA are undocumented and may change.
- ANCOM publishes other data (operator registry, complaints) on ancom.ro under separate URLs.

## Tutorial seeds (for content pipeline)

- "Cât de rapid e internetul la tine acasă vs media zonei (Netograf API)"
- "Construiește o hartă a calității internetului în RO din Netograf"

## ro-api-hub integration plan

- [ ] Catalogue entry noting JS-only
- [ ] Discover SPA API via DevTools, build a thin proxy with cache
- [ ] MCP tool: `get_internet_quality(location)`

## References

- About: https://www.netograf.ro/about
- ANCOM: https://www.ancom.ro/
- Last manual verification: 2026-05-27
