---
slug: orange-ro-camara
title: Orange Romania CAMARA Network APIs
category: telecom
institution: Orange România SA
country: RO
status: active
verified_at: 2026-05-27
auth: oauth2
protocol: REST/JSON
openapi_spec: true
sandbox_available: true
contract_required: true
pricing: enterprise
rate_limit: unknown
official_docs: https://developer.orange.com
api_base_url: https://api.orange.com
last_known_version: "v0/v1 (CAMARA)"
mandatory_for_business: false
---

# Orange Romania CAMARA Network APIs

## Overview

Orange Romania exposes a growing catalogue of CAMARA-standard network APIs through the global Orange Developer portal: KYC Match RO, SIM Swap, Number Verification, Quality on Demand (QoD), Device Location Verification and Population Density Data. A 5G Lab sandbox opened in Bucharest and Iași in July 2025 for partners to prototype. CAMARA endpoints are vendor-neutral so the same client code targets other CAMARA telcos worldwide.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `/camara/orange-romania/kyc-match/v0/match` | Verify customer name/address/IDno against SIM owner |
| POST | `/camara/orange-romania/sim-swap/v1/check` | Detect recent SIM swap (anti-fraud) |
| POST | `/camara/orange-romania/number-verification/v1/verify` | Verify number ownership via mobile data |
| POST | `/camara/orange-romania/qod/v0/sessions` | Request QoS guarantee |
| GET | `/camara/orange-romania/population-density/v0/...` | Anonymised density tiles |

## Authentication

OAuth2 3-legged client-credentials and authorisation-code flows. Register app at developer.orange.com, get `client_id`/`client_secret`, exchange for Bearer access token scoped per API (e.g. `kyc-match-read`).

## Request example

```bash
curl -X POST 'https://api.orange.com/camara/orange-romania/sim-swap/v1/check' \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"phoneNumber":"+40712345678","maxAge":240}'
```

## Response example

```json
{ "swapped": false }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Multi | CAMARA reference SDKs | active | github.com/camaraproject |
| JS | `@orange/sdk` (parts) | partial | Some APIs only |

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [x] 5G Lab sandbox Bucharest / Iași (since Jul 2025)
- [ ] Local simulator

## Known issues / gotchas

- Per-API onboarding contract: KYC Match is GDPR-sensitive and requires explicit user consent flow.
- Population Density Data is delivered as aggregated tiles, not raw subscriber data.
- QoD bandwidth profiles vary by region (5G coverage).
- CAMARA spec is still v0 for many APIs — breaking changes possible.

## Tutorial seeds (for content pipeline)

- "Anti-fraud login with Orange SIM Swap API in Node.js"
- "Verifying RO customer identity with KYC Match (banking onboarding)"
- "Real-time delivery density heatmap using Population Density Data"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (pull from CAMARA GitHub)
- [ ] Thin REST wrapper (consent flow helper)
- [ ] MCP tool exposed via FastMCP
- [ ] Code samples (Node/Python/PHP)

## References

- Orange Developer: https://developer.orange.com
- KYC Match RO: https://docs.developer.orange.com/network-apis/api-catalog/kyc-match/ro
- CAMARA project: https://github.com/camaraproject
- Last manual verification: 2026-05-27
