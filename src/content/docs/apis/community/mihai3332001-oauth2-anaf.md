---
slug: mihai3332001-oauth2-anaf
title: mihai3332001/oauth2-anaf — Symfony OAuth2 helper for ANAF (stale)
category: community
institution: mihai3332001 (open-source)
country: RO
status: stale
verified_at: 2026-05-27
auth: oauth2
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: "matches ANAF upstream"
official_docs: https://github.com/mihai3332001/oauth2-anaf
api_base_url: https://logincert.anaf.ro/anaf-oauth2/v1/
last_known_version: "(3 commits ever — last activity 2023-11-25, abandoned)"
mandatory_for_business: false
---

# mihai3332001/oauth2-anaf

## Overview

PHP / Symfony helper for the ANAF OAuth2 authorize + token flow (`logincert.anaf.ro`). **Abandoned** — only 3 commits, last activity 2023-11-25. Useful only as a reference for what the bare-minimum OAuth2 Symfony bundle for ANAF looks like; for any real PHP project use `andalisolutions/anaf-php` instead.

## Endpoints (covered)

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://logincert.anaf.ro/anaf-oauth2/v1/authorize` | Authorization redirect |
| POST | `https://logincert.anaf.ro/anaf-oauth2/v1/token` | Token exchange + refresh |

## Authentication

ANAF OAuth2 (qualified cert handled by your HTTP client config).

## Request example

```php
// Symfony controller — see repo for the bundle config
$url = $oauthAnaf->getAuthorizationUrl();
return new RedirectResponse($url);
```

## Response example

Standard OAuth2 token JSON (`access_token`, `refresh_token`, `expires_in`).

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| PHP | `mihai3332001/oauth2-anaf` | stale 2023 (abandoned) | This entry |
| PHP | `andalisolutions/anaf-php` | active 2025-08 | Use this instead |
| PHP | `itrack/anaf` | active | VAT-only, no OAuth |

## Testing approach

- [ ] Direct HTTP test — verify OAuth flow against ANAF test env
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [x] Sandbox: ANAF test env
- [ ] Local simulator

## Known issues / gotchas

- 3 commits total — minimal, untested at scale
- No PHP version compatibility statement; likely fails on PHP 8.2+
- No refresh-token rotation handling
- No tests, no CI

## Tutorial seeds (for content pipeline)

- **"Fork-and-revive: turning mihai3332001/oauth2-anaf into a maintained Symfony bundle"** — what to update (PHP 8.2+, Symfony 7, league/oauth2-client base, refresh logic, tests)
- "OAuth2 with ANAF in Symfony — minimal modern setup (without this stale bundle)"
- "Why abandoned OAuth helpers are dangerous (token expiry, refresh races)"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site (mark as stale, recommend alternatives)
- [ ] Use as reference impl only — do NOT depend at runtime
- [ ] If ro-api-hub ships a Symfony bundle, fork-and-revive is the cleanest base
- [ ] Coordinate naming with `andalisolutions/anaf-php` to avoid confusion

## References

- Repo: https://github.com/mihai3332001/oauth2-anaf
- Last activity: 2023-11-25 (3 commits ever)
- Last manual verification: 2026-05-27
