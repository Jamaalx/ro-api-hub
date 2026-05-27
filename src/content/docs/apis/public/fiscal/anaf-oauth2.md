---
slug: anaf-oauth2
title: ANAF OAuth2 Token Service (logincert)
category: fiscal
institution: ANAF
country: RO
status: active
verified_at: 2026-05-27
auth: qualified_cert
protocol: OAuth2
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: "unknown"
official_docs: https://static.anaf.ro/static/10/Anaf/Informatii_R/API/Oauth_procedura_inregistrare_aplicatii_portal_ANAF.pdf
api_base_url: https://logincert.anaf.ro/anaf-oauth2/v1
last_known_version: "v1"
mandatory_for_business: false
---

# ANAF OAuth2 Token Service

## Overview

Centralized OAuth2 authorization server that issues access tokens for ANAF protected APIs (e-Factura, e-Transport, SPV WS2, SAF-T submission, e-TVA). Authorization step requires the user's qualified digital certificate to be presented in the TLS handshake; token endpoint accepts standard `authorization_code` and `refresh_token` grants.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://logincert.anaf.ro/anaf-oauth2/v1/authorize?response_type=code&client_id={cid}&redirect_uri={uri}&token_content_type=jwt` | Authorization (browser w/ cert) |
| POST | `https://logincert.anaf.ro/anaf-oauth2/v1/token` | Exchange code / refresh token |
| POST | `https://logincert.anaf.ro/anaf-oauth2/v1/revoke` | Revoke a token |

## Authentication

1. Acquire a qualified digital certificate from a Romanian QTSP (certSIGN, DigiSign, AlfaSign, Trans Sped).
2. Log into SPV and register an OAuth2 application — fill `redirect_uri`, get `client_id` + `client_secret`.
3. Direct the user's browser to `/authorize` with their cert installed; ANAF prompts for cert selection.
4. ANAF redirects to your `redirect_uri?code=...`.
5. POST the code to `/token` with `client_id`, `client_secret`, `grant_type=authorization_code`, `redirect_uri`.
6. Store `access_token` (≈90 day TTL) + `refresh_token` (≈365 day TTL).
7. Refresh BEFORE access_token expires — refresh tokens are single-use and rotated each refresh.

## Request example

```bash
# Exchange code for tokens
curl -X POST 'https://logincert.anaf.ro/anaf-oauth2/v1/token' \
  -d 'grant_type=authorization_code' \
  -d 'client_id=YOUR_CLIENT_ID' \
  -d 'client_secret=YOUR_CLIENT_SECRET' \
  -d 'code=AUTHCODE_FROM_REDIRECT' \
  -d 'redirect_uri=https://yourapp.example.com/anaf/callback' \
  -d 'token_content_type=jwt'
```

## Response example

```json
{
  "access_token": "eyJraWQ...",
  "token_type": "Bearer",
  "expires_in": 7776000,
  "refresh_token": "eyJraWQ...",
  "scope": "..."
}
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| TS | `florin-szilagyi/efactura-anaf-ts-sdk` | active 2026-05 | Built-in OAuth client + refresh-rotation helper |
| Go | `printesoi/e-factura-go` | active 2026-01 | OAuth helper, JWT decoding |
| PHP | `andalisolutions/anaf-php` | active 2025-08 | OAuth helper |
| PHP | `mihai3332001/oauth2-anaf` | stale 2023 | 3 commits ever |

## Testing approach

- [ ] Cannot test without a real qualified cert (no sandbox for authorize step)
- [x] Refresh token flow can be unit-tested by mocking the token endpoint
- [x] `aperta-sync/anaf-api-simulator` simulates token issuance for local dev

## Known issues / gotchas

- Browser cert prompt is the ONLY way to authorize — no headless flow exists
- Cert is hardware-bound (token/smartcard) → cannot be installed on a server
- Refresh tokens are **single-use and rotated** — store the NEW refresh_token after each refresh or you'll lose access
- Replacing the underlying cert invalidates the access_token but USUALLY keeps refresh_token valid — test edge cases per QTSP
- `token_content_type=jwt` is needed to get a structured JWT (default returns opaque token)
- Use `client_credentials` is NOT supported — interactive cert auth is required

## Tutorial seeds (for content pipeline)

- "ANAF OAuth2 step-by-step: from CSR to working access token"
- "Refresh-token rotation: the bug that takes down your e-Factura integration on day 91"
- "Storing ANAF tokens safely (KMS, sealed-secrets, vault patterns)"
- "Multi-tenant ANAF OAuth: one cert per customer"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] Shared OAuth2 client used by all ANAF-protected wrappers
- [ ] MCP tool: `anaf_oauth_status` (read-only — never store tokens server-side in MCP)
- [ ] Tutorial repo: end-to-end Node example with cookie callback

## References

- Procedure PDF: https://static.anaf.ro/static/10/Anaf/Informatii_R/API/Oauth_procedura_inregistrare_aplicatii_portal_ANAF.pdf
- ANAF online services index: https://www.anaf.ro/anaf/internet/ANAF/servicii_online/
- Community walkthrough: https://docs.socrate.io
- Last manual verification: 2026-05-27
