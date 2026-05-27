---
slug: bt-psd2
title: Banca Transilvania API Store (PSD2)
category: banks
institution: Banca Transilvania S.A.
country: RO
status: active
verified_at: 2026-05-27
auth: oauth2
protocol: REST/JSON
openapi_spec: true
sandbox_available: true
contract_required: true
pricing: free
rate_limit: unknown
official_docs: https://apistorebt.ro/bt/sb/
api_base_url: unknown
last_known_version: "Berlin Group NextGenPSD2"
mandatory_for_business: false
---

# Banca Transilvania API Store (PSD2)

## Overview

Largest Romanian bank by assets. API Store exposes Berlin Group PSD2 APIs (Accounts, Payments, Funds Confirmation) in a free sandbox plus premium banking APIs under commercial contract.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | unknown (`/v1/accounts`) | List PSU accounts (AISP) |
| GET | unknown (`/v1/accounts/{id}/transactions`) | Transactions |
| POST | unknown (`/v1/payments/sepa-credit-transfers`) | Initiate SEPA CT |
| POST | unknown (`/v1/funds-confirmations`) | PIISP funds check |

## Authentication

OAuth2 (PSU consent) + eIDAS QWAC mTLS. Sandbox test certs available after registering at apistorebt.ro. Production requires real eIDAS qualified certificate.

## Request example

```bash
curl -X GET 'https://apistorebt.ro/.../v1/accounts' \
  -H 'Authorization: Bearer <token>' \
  -H 'X-Request-ID: <uuid>' \
  --cert qwac.pem --key qwac.key
```

## Response example

```json
{ "accounts": [{ "resourceId": "...", "iban": "RO...", "currency": "RON" }] }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | — | — | No first-party SDK; generic Berlin Group clients |

## Testing approach

- [x] Sandbox at https://apistorebt.ro/bt/sb/
- [ ] Sandbox QWAC required
- [ ] Postman collection (community)

## Known issues / gotchas

- Finqware 2024 benchmark of 16 RO bank PSD2 APIs — **3 broken in prod**
- API Store UI sometimes returns 403 to non-browser User-Agents
- Premium APIs gated by contract

## Tutorial seeds

- "BT PSD2 sandbox quickstart"
- "Connecting BT accounts to a fintech app via AISP"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] OpenAPI mirror
- [ ] REST wrapper with QWAC mgmt
- [ ] MCP tool
- [ ] Multi-lang samples

## References

- Official: https://apistorebt.ro/bt/sb/
- Berlin Group: https://www.berlin-group.org/nextgenpsd2-downloads
- Last manual verification: 2026-05-27
