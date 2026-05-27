---
slug: fgo
title: FGO Invoicing API
category: invoicing
institution: FGO SRL
country: RO
status: active
verified_at: 2026-05-27
auth: basic_auth
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: true
pricing: enterprise
rate_limit: unknown
official_docs: https://www.fgo.ro/integrare/api/
api_base_url: https://api.fgo.ro
last_known_version: unknown
mandatory_for_business: false
---

# FGO Invoicing API

## Overview

FGO is a Romanian invoicing & accounting SaaS popular with mid-market and accountants. REST API covers documents (invoice, proforma, receipt, notice, NIR), e-Factura ANAF integration, stock, clients, products and partners. API access is restricted to the **Enterprise plan** — not available on lower tiers.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `/auth/login` | Authenticate |
| POST | `/docs/invoice` | Create invoice |
| GET | `/docs/invoice/{id}` | Read invoice |
| POST | `/docs/efactura/upload` | e-Factura ANAF |
| GET | `/stock` | Stock levels |
| POST | `/partners` | Create partner |

## Authentication

POST `user` + `password` to `/auth/login` to obtain a token, pass as `Authorization: Bearer ...`. Subscription tier must be Enterprise — otherwise API returns 403 even with valid credentials.

## Request example

```bash
curl -X POST 'https://api.fgo.ro/auth/login' \
  -H 'Content-Type: application/json' \
  -d '{"user":"office@example.ro","password":"..."}'
```

## Response example

```json
{ "token": "eyJ...", "expiresIn": 3600 }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| PHP | none official | — | Community Gists |
| Saga | FGO ↔ Saga Soft sync | official | Bridges desktop Saga |

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- **Enterprise plan required** — verify before integrating.
- e-Factura ANAF requires SPV linkage in FGO admin first.
- Sync with Saga Soft (desktop) is asynchronous — confirm in admin.
- Documents may have multiple lines with VAT type per line.

## Tutorial seeds (for content pipeline)

- "Integrating FGO API with a custom POS"
- "Bridging Saga Soft to e-Factura via FGO"
- "Upgrading FGO plan to unlock API access"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (community-built)
- [ ] Thin REST wrapper
- [ ] MCP tool exposed via FastMCP
- [ ] Code samples (Node/Python/PHP)

## References

- Official docs: https://www.fgo.ro/integrare/api/
- Public site: https://www.fgo.ro
- Last manual verification: 2026-05-27
