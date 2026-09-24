---
slug: troco-rca
title: Troco.ro RCA Aggregator API
category: insurance
institution: Troco Broker de Asigurare SRL
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: api_key
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: true
pricing: enterprise
rate_limit: unknown
official_docs: https://troco.ro/
api_base_url: https://troco.ro/
last_known_version: unknown
mandatory_for_business: false
---

# Troco.ro RCA Aggregator API

## Overview

Troco is a Romanian insurance broker that aggregates RCA (mandatory motor third-party liability), CASCO, travel and home offers from major RO insurers. It provides a B2B integration so partners (dealers, fleet managers, automotive marketplaces, banks) can quote and bind policies under Troco's broker license. API access requires a partnership contract and per-partner credentials.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `/api/auth` | Authenticate |
| POST | `/api/rca/quotes` | Get RCA quotes for vehicle / driver |
| POST | `/api/rca/bind` | Bind selected offer |
| POST | `/api/casco/quotes` | CASCO quotes |
| GET | `/api/policy/{id}` | Read policy |

## Authentication

API key + partner secret (contract-issued). Send as `Authorization: Bearer <token>` after exchanging credentials at `/api/auth`.

## Request example

```bash
curl -X POST 'https://troco.ro/api/rca/quotes' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"plate":"B 100 ABC","cnp":"...","period":12}'
```

## Response example

```json
{ "offers": [ { "insurer": "Allianz", "price": 850, "currency": "RON" } ] }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Partners | white-label embed | active | iframe / SDK on request |

## Testing approach

- [ ] Direct HTTP test (curl / fetch) — needs partner credentials
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available — by request only
- [ ] Local simulator

## Known issues / gotchas

- Strictly partner-only; no self-service signup for the API.
- KYC + AML obligations on broker side — partner must transmit CNP / company data securely.
- Offer set varies per insurer's API availability that day.
- Pricing model includes broker commission share.

## Tutorial seeds (for content pipeline)

- "Embedding Troco RCA quote widget in a dealer site (partner SDK)"
- "GDPR-compliant CNP transmission to Troco API"
- "Comparing Troco vs Pago/i-Asigurare partner programs"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (NDA-gated)
- [ ] Thin REST wrapper (partner mode)
- [ ] MCP tool exposed via FastMCP (partner-keyed)
- [ ] Code samples (Node/PHP)

## References

- Public site: https://troco.ro/
- Last manual verification: 2026-05-27
