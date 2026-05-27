---
slug: ing-ro-psd2
title: ING Romania Open Banking (PSD2)
category: banks
institution: ING Bank N.V. Amsterdam, Bucharest Branch
country: RO
status: active
verified_at: 2026-05-27
auth: oauth2
protocol: REST/JSON
openapi_spec: true
sandbox_available: true
contract_required: true
pricing: freemium
rate_limit: unknown
official_docs: https://developer.ing.com/openbanking
api_base_url: unknown
last_known_version: "Berlin Group NextGenPSD2"
mandatory_for_business: false
---

# ING Romania Open Banking (PSD2)

## Overview

ING global developer portal — Romania is one of the supported countries. Berlin Group PSD2 free APIs (Accounts, Payments, Funds Confirmation) plus premium APIs (Instant Payments, Virtual Ledger, Payment Request, etc.) under paid contract.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | unknown (`/v3/accounts`) | AISP accounts (ING legacy v3) |
| GET | unknown (`/v3/accounts/{id}/transactions`) | Transactions |
| POST | unknown (`/v3/payments/sepa-credit-transfers`) | SEPA CT |

## Authentication

OAuth2 + mTLS. ING uses application-level signature (HTTP digest + signature header) on top of mTLS. Sandbox issues test certs and a demo client_id.

## Request example

```bash
curl -X GET 'https://api.ing.com/.../v3/accounts' \
  -H 'Authorization: Bearer <token>' \
  -H 'Digest: SHA-256=...' \
  -H 'Signature: keyId="...",algorithm="rsa-sha256",signature="..."' \
  --cert tls.pem --key tls.key
```

## Response example

```json
{ "accounts": [{ "resourceId": "...", "iban": "RO..." }] }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| JS | `danlucian/ing-psd2-oauth2-sdk` (GitHub) | community | OAuth2 helper for ING PSD2 |

## Testing approach

- [x] Sandbox at https://developer.ing.com/openbanking
- [ ] mTLS + HTTP message signing both required
- [ ] Postman collection (official)

## Known issues / gotchas

- Finqware 2024 benchmark — **3 of 16 RO bank PSD2 APIs broken in prod**
- HTTP message signing trips up most generic Berlin Group clients
- Premium APIs paywalled
- Multi-country portal — RO availability per-API varies

## Tutorial seeds

- "ING PSD2 in Node with `danlucian/ing-psd2-oauth2-sdk`"
- "Generating ING HTTP message signatures"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] OpenAPI mirror
- [ ] Wrapper handling signing
- [ ] MCP tool
- [ ] Samples

## References

- Official: https://developer.ing.com/openbanking
- Community SDK: https://github.com/danlucian/ing-psd2-oauth2-sdk
- Berlin Group: https://www.berlin-group.org/nextgenpsd2-downloads
- Last manual verification: 2026-05-27
