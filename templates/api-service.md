---
slug: example-service
name: Full Name of the Service
category: fiscal | finance | registry | stats | geo | health | transport | justice | identity | gov | opendata | procurement | elections | regulators | banks | payments | couriers | telecom | marketplaces | sms | invoicing | maps | jobs | energy | insurance | aggregator | community
institution: Issuing institution / company
country: RO
status: active | stale | broken | suspended | gated
verified_at: 2026-05-27
auth: none | api_key | oauth2 | mtls | qualified_cert | basic_auth | contract
protocol: REST/JSON | REST/XML | SOAP | OGC_WMS | OGC_WFS | ArcGIS_REST | OData | static_files
openapi_spec: true | partial | false
sandbox_available: true | false
contract_required: true | false
pricing: free | freemium | pay_as_you_go | subscription | enterprise | mandatory
rate_limit: "e.g. 1 req/s, 100 items/req" | unknown | none_documented
official_docs: https://...
api_base_url: https://...
last_known_version: "e.g. v9"
mandatory_for_business: true | false
---

# {Service Name}

## Overview

One paragraph describing what the API does, who issues it, and the typical use case.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://...` | ... |

## Authentication

How to authenticate. Step-by-step if non-trivial (OAuth registration, mTLS cert generation, etc.).

## Request example

```bash
curl -X POST 'https://...' \
  -H 'Content-Type: application/json' \
  -d '[{"cui": 12345678, "data": "2026-05-27"}]'
```

## Response example

```json
{ "...": "..." }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| PHP | `vendor/package` | active 2026 | ... |
| TS | `github.com/x/y` | stale 2023 | ... |

## Testing approach

- [ ] Direct HTTP test (curl / fetch)
- [ ] Playwright needed (JS-rendered page)
- [ ] Browser UA spoof needed (WAF blocks default UA)
- [ ] Sandbox available at `https://...`
- [ ] Local simulator: ...

## Known issues / gotchas

- WAF blocks non-browser User-Agents
- TLS cert mismatch (need `rejectUnauthorized: false`)
- Versioning quirk: ...
- Rate limit not published officially: ...

## Tutorial seeds (for content pipeline)

- "How to {do most common task} in {language}"
- "{Edge case}: handling {tricky thing}"
- "Caching {API} responses with Redis"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (if missing officially)
- [ ] Thin REST wrapper (BrasilAPI-style facade)
- [ ] MCP tool exposed via FastMCP
- [ ] Code samples (Node/Python/PHP/Go)

## References

- Official docs: <URL>
- Government regulation/law: <URL if applicable>
- Community discussion: <URL>
- Last manual verification: 2026-05-27
