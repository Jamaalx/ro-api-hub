---
slug: catalog-servicii-publice
title: Catalogul Național al Serviciilor Publice
category: gov
institution: Autoritatea pentru Digitalizarea României (ADR)
country: RO
status: active
verified_at: 2026-05-27
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: unknown
official_docs: https://serviciipublice.gov.ro/
api_base_url: https://serviciipublice.gov.ro/
last_known_version: "n/a"
mandatory_for_business: false
---

# Catalogul Național al Serviciilor Publice

## Overview

The National Catalog of Public Services is ADR's structured directory of 2900+ public services offered by Romanian central and local government — each described with required documents, fees, processing time, responsible institution, and (where available) the URL of the online form. It is the canonical "what does the state offer" registry. The site itself is mostly a search UI; a publishable JSON dataset may be available via data.gov.ro or directly via an internal API used by the SPA.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://serviciipublice.gov.ro/` | Search UI |
| GET | `https://serviciipublice.gov.ro/api/` | Internal API used by SPA (undocumented) |

## Authentication

None.

## Request example

```bash
curl 'https://serviciipublice.gov.ro/' \
  -H 'User-Agent: Mozilla/5.0' \
  -H 'Accept: application/json'
```

## Response example

JSON or HTML depending on endpoint.

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | — | — | None known |

## Testing approach

- [ ] Direct HTTP test (curl / fetch)
- [x] Playwright needed (JS-rendered)
- [x] Browser UA spoof recommended
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- TLS cert errors reported in some clients (verification 2026-05-27 noted issue).
- API surface undocumented; SPA endpoints may change.
- Multilingual fields (RO primary) — handle UTF-8 carefully.

## Tutorial seeds (for content pipeline)

- "Cum construiești un chatbot care răspunde 'unde depun X' pe baza catalogului"
- "Mapare servicii publice → MCP tools pentru asistenți AI"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] Reverse-engineered OpenAPI spec for the internal API
- [ ] Thin REST wrapper + nightly snapshot dump (CSV/JSON)
- [ ] MCP tool: `find_public_service(query)`

## References

- Site: https://serviciipublice.gov.ro/
- ADR: https://www.adr.gov.ro/
- Last manual verification: 2026-05-27
