---
slug: openapi-ro
title: openapi.ro — Romanian Public Data Aggregator
category: aggregator
institution: openapi.ro (commercial)
country: RO
status: active
verified_at: 2026-05-27
auth: api_key
protocol: REST/JSON
openapi_spec: partial
sandbox_available: false
contract_required: false
pricing: freemium
rate_limit: "100 requests / month on free tier"
official_docs: https://openapi.ro/en
api_base_url: https://api.openapi.ro/api/
last_known_version: "v1"
mandatory_for_business: false
---

# openapi.ro

## Overview

Commercial Romanian aggregator wrapping ANAF (VAT/CUI lookup), ONRC (companies registry), BNR (FX rates), and validators for IBAN/CNP/CIF into a single REST/JSON API with API-key authentication. Free tier provides 100 requests per month; paid plans for higher volume. Useful as a one-stop fallback when official endpoints are rate-limited or down.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://api.openapi.ro/api/companies/{CUI}` | Company info (ANAF + ONRC) |
| GET | `https://api.openapi.ro/api/exchange/{date}` | BNR FX rates for a date |
| GET | `https://api.openapi.ro/api/validate/cnp/{cnp}` | CNP checksum + region |
| GET | `https://api.openapi.ro/api/validate/iban/{iban}` | IBAN validation (RO) |
| GET | `https://api.openapi.ro/api/validate/cif/{cif}` | CIF validation |

## Authentication

Register at https://openapi.ro/en → obtain API key → send via `x-api-key` header.

## Request example

```bash
curl -H "x-api-key: YOUR_KEY" \
  https://api.openapi.ro/api/companies/14399840
```

## Response example

```json
{
  "cui": 14399840,
  "denumire": "DEDEMAN SRL",
  "adresa": "MUN. BACAU, STR. ALEXEI TOLSTOI, NR. 8",
  "telefon": "0234207630",
  "stare_inregistrare": "INREGISTRAT din data 28 Februarie 2002",
  "tva": true
}
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | None official | — | Apiary docs at `openapiro.docs.apiary.io` (legacy, Oracle sunset) |

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- Apiary docs host on a sunset path (Oracle deprecating Apiary) — main docs at https://openapi.ro/en should be canonical reference
- Free tier 100 req/mo is very tight for any production use
- Mixed source-of-truth: ONRC vs ANAF data may diverge for very recent registrations
- No published SLA

## Tutorial seeds (for content pipeline)

- "Fallback strategy: when ANAF v9 is down, use openapi.ro"
- "Validating Romanian IBAN + CNP + CIF in Node.js with openapi.ro"
- "Comparing openapi.ro vs direct ANAF v9 vs incorpo.ro MCP"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (community-built, not officially provided)
- [ ] Compare-and-contrast page vs ro-api-hub's own free wrapper
- [ ] MCP tool exposed via FastMCP (route to openapi.ro as backup when official ANAF returns 5xx)
- [ ] Code samples (Node/Python/PHP/Go)

## References

- Official docs: https://openapi.ro/en
- Legacy Apiary: https://openapiro.docs.apiary.io/
- Last manual verification: 2026-05-27
