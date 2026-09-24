---
slug: arr
title: ARR — Autoritatea Rutieră Română
category: transport
institution: Autoritatea Rutieră Română (ARR)
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: basic_auth
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: unknown
official_docs: https://www.arr.ro/
api_base_url: https://www.arr.ro/
last_known_version: "n/a"
mandatory_for_business: false
---

# ARR — Autoritatea Rutieră Română

## Overview

ARR is the Romanian Road Authority overseeing transport operator licensing, ATP/ADR certifications, professional driver attestations, and tachograph cards. The main site and several sub-applications (testare.arr.ro, licente.arr.ro, etc.) are active in 2026. There is no documented public REST API — interactions are through web forms requiring operator login. Some public registers (transport licences, operator lists) may be downloadable as files.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://www.arr.ro/` | Main portal |
| GET | `https://testare.arr.ro/` | Driver testing portal |
| GET | `https://licente.arr.ro/` | Licensing portal |

## Authentication

Web account login (operator/individual); no API keys issued.

## Request example

No public API.

```bash
# Forms-only — not API-callable
```

## Response example

HTML / downloadable PDFs.

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | — | — | None known |

## Testing approach

- [ ] Direct HTTP test (curl / fetch)
- [x] Playwright needed (sub-apps are JS-rendered)
- [x] Browser UA spoof recommended
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- Multiple sub-domains with different stacks; no unified API.
- Forms require authenticated session.
- Public registers (when published) are PDF/XLS, not JSON.

## Tutorial seeds (for content pipeline)

- "Cum verifici o licență de transport ARR pentru un transportator"
- "ATP / ADR / tachograf — fluxul digital ARR pentru flotă"

## ro-api-hub integration plan

- [ ] Catalogue entry noting forms-only
- [ ] Monitor for any open dataset publication on data.gov.ro
- [ ] No wrapper unless an open endpoint surfaces

## References

- Main: https://www.arr.ro/
- Testare: https://testare.arr.ro/
- Licente: https://licente.arr.ro/
- Last manual verification: 2026-05-27
