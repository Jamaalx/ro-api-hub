---
slug: pago-iasigurare
title: Pago / i-Asigurare (Vodafone) API
category: insurance
institution: Pago SA (subsidiar Vodafone Romania) — brand i-Asigurare
country: RO
status: stale
verified_at: 2026-05-27
auth: oauth2
protocol: REST/JSON
openapi_spec: false
sandbox_available: true
contract_required: true
pricing: enterprise
rate_limit: unknown
official_docs: https://www.pago.ro/
api_base_url: https://api.pago.ro/
last_known_version: unknown
mandatory_for_business: false
---

# Pago / i-Asigurare (Vodafone) API

## Overview

Pago is a Romanian fintech (Vodafone-owned since 2021) that aggregates bill payment, utilities, telecom and insurance. The i-Asigurare brand offers RCA, CASCO and travel policies through partner insurers. Consumer flows use OAuth2; partner / merchant APIs are also available under contract for bill issuers, banks and marketplaces.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `/oauth/token` | OAuth2 access token |
| POST | `/api/insurance/rca/quote` | RCA quotes |
| POST | `/api/insurance/rca/bind` | Bind RCA policy |
| POST | `/api/bills` | Issue bill / payment request |
| GET | `/api/payments/{id}` | Payment status |

## Authentication

OAuth2 (client_credentials for server-to-server partner integrations; authorization_code for apps acting on a Pago user). Credentials are issued per partner.

## Request example

```bash
curl -X POST 'https://api.pago.ro/oauth/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=client_credentials&client_id=...&client_secret=...'
```

## Response example

```json
{ "access_token": "eyJ...", "token_type": "Bearer", "expires_in": 3600 }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Mobile | Pago app SDKs (partners) | active | iOS / Android |
| Web | embed widgets | active | iframe |

## Testing approach

- [x] Direct HTTP test (curl / fetch) — partner credentials required
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [x] Sandbox available — yes, per partner
- [ ] Local simulator

## Known issues / gotchas

- **Link check 2026-09-24:** `api_base_url` https://api.pago.ro/ → ENOTFOUND (twice, ≥30 s apart). Needs a human to find the new URL.
- Partner onboarding requires contract + AML/KYC review.
- Insurer offer set rotates depending on Pago broker partner availability.
- Token scopes differ for insurance vs bills vs payments.
- Webhook signatures use HMAC; verify before processing.

## Tutorial seeds (for content pipeline)

- "Issuing bills through Pago for a utility startup"
- "Embedding i-Asigurare RCA flow in a fintech app"
- "OAuth2 + HMAC webhook hardening for Pago integrations"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (NDA-gated)
- [ ] Thin REST wrapper (partner mode)
- [ ] MCP tool exposed via FastMCP (partner-keyed)
- [ ] Code samples (Node/Python)

## References

- Public site: https://www.pago.ro/
- i-Asigurare: https://www.pago.ro/asigurari
- Vodafone press (acquisition): https://www.vodafone.ro
- Last manual verification: 2026-05-27
