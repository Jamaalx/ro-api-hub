---
slug: libra-bank-psd2
title: Libra Internet Bank Open Banking (PSD2)
category: banks
institution: Libra Internet Bank S.A.
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: oauth2
protocol: REST/JSON
openapi_spec: partial
sandbox_available: true
contract_required: true
pricing: free
rate_limit: unknown
official_docs: https://api.librabank.ro/devportal/
api_base_url: unknown
last_known_version: "Berlin Group NextGenPSD2"
mandatory_for_business: false
---

# Libra Internet Bank Open Banking (PSD2)

## Overview

Libra Internet Bank publishes its PSD2 stack through a WSO2 developer portal at `api.librabank.ro/devportal/` (formerly the API store at `/store/`). Berlin Group spec. Also offers a paid **Premium API Banking** product for richer integrations beyond regulated PSD2 minima.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | unknown (`/v1/accounts`) | AISP |
| GET | unknown (`/v1/accounts/{id}/transactions`) | Transactions |
| POST | unknown (`/v1/payments/{product}`) | PISP |

## Authentication

OAuth2 + eIDAS QWAC mTLS.

## Request example

```bash
curl -X GET 'https://api.librabank.ro/.../v1/accounts' \
  -H 'Authorization: Bearer <token>' \
  -H 'X-Request-ID: <uuid>' \
  --cert qwac.pem --key qwac.key
```

## Response example

```json
{ "accounts": [{ "iban": "RO..." }] }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | — | — | No official SDK |

## Testing approach

- [x] Sandbox at https://api.librabank.ro/devportal/
- [ ] Test QWAC required
- [ ] Spec distributed as PDF (not OpenAPI YAML)

## Known issues / gotchas

- **Portal moved (resolved 2026-09-24):** the old WSO2 API store `/store/` now redirects to the admin console login (403). The developer portal is at **`/devportal/`** (200); the bank's PSD2 technical documentation PDF is served from `/devportal/site/public/`. Access to the API list needs credentials from Libra.
- Finqware 2024 benchmark — **3 of 16 RO bank PSD2 APIs broken in prod**
- Spec ships as PDF — manual OpenAPI transcription needed
- Premium API Banking under separate commercial contract

## Tutorial seeds

- "Libra PSD2 quickstart"
- "Transcribing the Libra PDF spec to OpenAPI 3.1"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] OpenAPI 3.1 (transcribed from PDF)
- [ ] Wrapper + MCP tool

## References

- Official: https://api.librabank.ro/devportal/
- Berlin Group: https://www.berlin-group.org/nextgenpsd2-downloads
- Libra — Payment Services Directive page: https://www.librabank.ro/directiva_servicii_plati
- Libra — Open Banking: https://www.librabank.ro/Open-Banking
- Last manual verification: 2026-05-27
