---
slug: mfpanaf-clientspv
title: MfpAnaf/ClientSPV — Official Java sample for ANAF SPV (stale)
category: community
institution: Ministerul Finanțelor (Mfp) — official reference sample
country: RO
status: stale
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: oauth2
protocol: REST/JSON
openapi_spec: false
sandbox_available: true
contract_required: false
pricing: free
rate_limit: "matches ANAF upstream"
official_docs: https://github.com/MfpAnaf/ClientSPV
api_base_url: https://webserviced.anaf.ro/SPVWS2/rest/
last_known_version: "unknown (10 commits, no releases)"
mandatory_for_business: false
---

# MfpAnaf/ClientSPV

## Overview

Official Java reference client for ANAF SPV (Spațiul Privat Virtual) web services, published under the MfpAnaf GitHub org. **Effectively abandoned** — only 10 commits ever, no releases tagged. Still useful as the canonical example of SPV authentication, request structure, and PDF download flow, even though the code is dated.

## Endpoints (covered)

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://webserviced.anaf.ro/SPVWS2/rest/listamesajereceiver` | List inbox messages |
| GET | `https://webserviced.anaf.ro/SPVWS2/rest/descarcare` | Download a message ZIP/PDF |

## Authentication

ANAF OAuth2 + qualified certificate (same flow as e-Factura).

## Request example

```bash
# Java (Maven) — see repo for full sample
mvn -q exec:java -Dexec.mainClass=ro.mfp.spvclient.Main \
  -Dexec.args="--cui 14399840 --token $TOKEN"
```

## Response example

```json
{ "mesaje": [ { "id": "abc", "tip": "RAS", "data_creare": "..." } ] }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Java | `github.com/MfpAnaf/ClientSPV` | stale (abandoned) | Reference only |
| TS | `florin-szilagyi/efactura-anaf-ts-sdk` | active 2026-05 | Modern alternative for related flows |
| PHP | `andalisolutions/anaf-php` | active 2025-08 | Modern alternative |

## Testing approach

- [x] Direct HTTP test against ANAF SPV
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [x] Sandbox: ANAF test env
- [x] Local simulator: `aperta-sync/anaf-api-simulator`

## Known issues / gotchas

- No releases — must build from source
- Java version + dependency pins likely outdated
- ANAF SPV schema may have evolved since last commit; verify against current docs
- No CI / no tests — treat as documentation-as-code

## Tutorial seeds (for content pipeline)

- **"Fork-and-revive: modernizing MfpAnaf/ClientSPV for Java 21"** — what to update (deps, OAuth lib, HTTP client, build to Maven Central)
- "Why the official Java sample is stale and what to use instead"
- "Reading SPV inbox programmatically — minimal Java example"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site (mark as stale, link as reference)
- [ ] Use as reference impl for SPV semantics when building ro-api-hub's SPV facade
- [ ] Consider fork-and-revive as a community contribution if SPV is in scope for ro-api-hub
- [ ] Do **not** depend on it at runtime

## References

- Repo: https://github.com/MfpAnaf/ClientSPV
- Status: 10 commits ever, no releases — abandoned
- Last manual verification: 2026-05-27
