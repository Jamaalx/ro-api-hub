---
slug: anre
title: ANRE — Autoritatea Națională de Reglementare în Energie
category: regulators
institution: ANRE
country: RO
status: broken
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: unknown
official_docs: https://anre.ro/
api_base_url: https://anre.ro/
last_known_version: "n/a"
mandatory_for_business: false
---

# ANRE — Autoritatea Națională de Reglementare în Energie

## Overview

ANRE is Romania's energy regulator (electricity, gas, district heating). It publishes tariffs, supplier registries, license lists, and consumer complaint data on its site. There is no documented public API; the site has TLS certificate issues (verified 2026-05-27) which complicate automated fetching. For energy-comparison consumer tools, ANRE's published price-comparator dataset (`comparator-preturi`) is the main resource — currently downloadable as XLS only.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://anre.ro/` | Main site (TLS issues) |
| GET | (price comparator XLS pages) | Downloadable XLS price lists |

## Authentication

None.

## Request example

No public API. Direct fetch fails TLS validation by default.

```bash
# Needs --insecure / relaxed TLS to test
curl --insecure 'https://anre.ro/'
```

## Response example

HTML / XLS files.

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | various consumer-comparator scrapers | varies | unofficial |

## Testing approach

- [ ] Direct HTTP test (curl / fetch) — TLS cert error blocks default clients
- [x] Playwright needed (for some pages)
- [x] Browser UA spoof recommended
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- TLS certificate mismatch — set `rejectUnauthorized: false` (Node) or `verify=False` (Python) to test, but flag in catalogue as broken-by-default.
- No published API — only XLS/PDF artefacts.
- Tariffs change frequently — invalidate caches per update notice.

## Tutorial seeds (for content pipeline)

- "Comparator de furnizori energie: cum normalizezi XLS-urile ANRE în JSON"
- "TLS broken pe site-uri publice RO: cum tratezi corect și sigur"

## ro-api-hub integration plan

- [ ] Catalogue entry noting TLS issue
- [ ] Periodic XLS download + normalize → JSON
- [ ] Wrapper exposes search by supplier / tariff / region

## References

- Site: https://anre.ro/
- Last manual verification: 2026-05-27 (TLS cert error)
