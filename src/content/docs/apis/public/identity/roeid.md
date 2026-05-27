---
slug: roeid
title: ROeID — Identitate Digitală Națională
category: identity
institution: Autoritatea pentru Digitalizarea României (ADR)
country: RO
status: active
verified_at: 2026-05-27
auth: oauth2
protocol: REST/JSON
openapi_spec: partial
sandbox_available: true
contract_required: true
pricing: free
rate_limit: unknown
official_docs: https://www.roeid.ro/
api_base_url: https://eidas.gov.ro/roeid/
last_known_version: "n/a"
mandatory_for_business: false
---

# ROeID — Identitate Digitală Națională

## Overview

ROeID is Romania's national digital identity scheme, notified under the EU eIDAS framework. It allows citizens to authenticate to public and private services using a mobile-based identity wallet. Relying Parties (RPs) integrate via OpenID Connect (OIDC) and SAML 2.0. The `github.com/roeid-ro/integrare` repository provides sample integrations (Keycloak, Node.js, Moodle, Ory Kratos). RP onboarding requires registration with ADR; sandbox is available.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://eidas.gov.ro/roeid/.well-known/openid-configuration` | OIDC discovery |
| GET | `https://eidas.gov.ro/roeid/authorize` | OIDC authorization |
| POST | `https://eidas.gov.ro/roeid/token` | OIDC token exchange |
| GET | `https://eidas.gov.ro/roeid/userinfo` | OIDC userinfo |
| POST | `https://eidas.gov.ro/roeid/saml/sso` | SAML 2.0 SSO endpoint |

## Authentication

- RP registration (client_id / client_secret or metadata XML) issued by ADR after onboarding.
- End users authenticate via mobile app (PIN + biometrics).

## Request example

Standard OIDC Authorization Code + PKCE:

```bash
# Step 1 — redirect user to:
# https://eidas.gov.ro/roeid/authorize?response_type=code&client_id=YOUR_RP&redirect_uri=https%3A%2F%2Fyour.app%2Fcb&scope=openid%20profile&code_challenge=...&code_challenge_method=S256

# Step 2 — exchange code:
curl -X POST 'https://eidas.gov.ro/roeid/token' \
  -d 'grant_type=authorization_code&code=...&client_id=YOUR_RP&code_verifier=...&redirect_uri=https%3A%2F%2Fyour.app%2Fcb'
```

## Response example

```json
{
  "access_token": "...",
  "id_token": "eyJhbGc...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Multi | `roeid-ro/integrare` | active 2026 | Sample integrations (Keycloak, Node, Moodle, Ory Kratos), 21★ |
| — | Any compliant OIDC/SAML lib | — | openid-client (Node), pyoidc (Py), itfoxtec (.NET) |

## Testing approach

- [x] Direct HTTP test (curl / fetch) for discovery + token
- [ ] Playwright needed (only for end-to-end including mobile flow)
- [ ] Browser UA spoof needed
- [x] Sandbox available (request via ADR onboarding)
- [ ] Local simulator

## Known issues / gotchas

- RP onboarding (contractual) required before sandbox client_id is issued.
- SAML metadata XML must be signed; clock skew sensitivity.
- ID token claims include only what the user consented to share (data minimisation).

## Tutorial seeds (for content pipeline)

- "Adaugă login cu ROeID la o aplicație Next.js (openid-client)"
- "ROeID vs eID național altor state: cum mapezi atributele eIDAS"
- "SAML 2.0 ROeID pentru Moodle / Keycloak"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] Link to official `roeid-ro/integrare` samples
- [ ] No wrapper needed — standard OIDC/SAML
- [ ] MCP tool: `verify_id_token` helper

## References

- Site: https://www.roeid.ro/
- eIDAS portal: https://eidas.gov.ro/roeid/
- Integration samples: https://github.com/roeid-ro/integrare
- Last manual verification: 2026-05-27
