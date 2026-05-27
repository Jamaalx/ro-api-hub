---
slug: everifica-ro
title: everifica.ro — Free ANAF v9 UI Wrapper
category: aggregator
institution: everifica.ro (community/commercial)
country: RO
status: active
verified_at: 2026-05-27
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: "implicit (browser-tier)"
official_docs: https://everifica.ro/
api_base_url: https://everifica.ro/
last_known_version: unknown
mandatory_for_business: false
---

# everifica.ro

## Overview

Free Romanian VAT verification site — a thin web UI wrapping ANAF VAT WS v9. Useful as a human-facing fallback or for quick manual checks. Not a documented programmatic API: any "API" usage requires scraping the page or its internal AJAX calls.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://everifica.ro/` | UI form (CUI input) |
| (Internal) | undocumented AJAX | Fetches ANAF v9 server-side |

## Authentication

None.

## Request example

```bash
# No public API — example below is hypothetical (inspect Network tab)
curl 'https://everifica.ro/check?cui=14399840' \
  -H 'User-Agent: Mozilla/5.0 ...'
```

## Response example

HTML page with ANAF v9 data rendered. JSON response not documented.

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | None | — | UI only; bypass it by calling ANAF v9 directly |

## Testing approach

- [ ] Direct HTTP test (curl / fetch) — only HTML
- [x] Playwright recommended for scraping
- [x] Browser UA spoof recommended
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- Not an API; using it as one is fragile and impolite
- Better path: call ANAF v9 directly (free, 1 req/s, 100 CUI/req)
- ToS unclear regarding automated scraping

## Tutorial seeds (for content pipeline)

- "Why you shouldn't scrape everifica.ro when ANAF v9 is free"
- "User-friendly RO VAT check pages: everifica.ro vs alternatives"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site (low priority — UI-only)
- [ ] Do **not** wrap; route directly to ANAF v9 instead
- [ ] Mention in "VAT verification UIs" comparison page

## References

- Site: https://everifica.ro/
- Underlying API: ANAF VAT WS v9
- Last manual verification: 2026-05-27
- **Missing data**: any documented programmatic interface
