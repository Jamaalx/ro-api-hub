---
slug: depabd
title: DEPABD — Direcția pentru Evidența Persoanelor și Administrarea Bazelor de Date
category: identity
institution: DEPABD (MAI)
country: RO
status: gated
verified_at: 2026-05-27
auth: contract
protocol: SOAP
openapi_spec: false
sandbox_available: false
contract_required: true
pricing: free
rate_limit: unknown
official_docs: https://depabd.mai.gov.ro/
api_base_url: (inter-institutional, not public)
last_known_version: "n/a"
mandatory_for_business: false
---

# DEPABD — Evidența Persoanelor

## Overview

DEPABD is the MAI directorate managing Romania's population registry, civil status, and ID-card production. Data is highly sensitive and access is strictly inter-institutional — there is no public API. Limited verification services (e.g. confirm an ID card is valid) are exposed only to authorised public entities (banks for KYC, notaries, telecom operators) under sectoral protocols. Citizens have access only to their own records via dedicated portals.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://depabd.mai.gov.ro/` | Institutional site |
| — | (private SOAP/REST) | Inter-institutional verification, contract only |

## Authentication

Inter-institutional protocol; qualified certificates + signed agreement with MAI.

## Request example

Not publicly documented.

```bash
# No public access
```

## Response example

n/a

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | — | — | None — restricted access |

## Testing approach

- [ ] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- Strictly restricted; do not attempt to scrape.
- GDPR + special-category data rules (national ID).
- KYC providers typically resell DEPABD checks under their own contracts.

## Tutorial seeds (for content pipeline)

- "De ce nu există API public pentru evidența populației și ce alternative legale ai pentru KYC"
- "ROeID ca substitut pentru verificarea identității într-o aplicație consumer"

## ro-api-hub integration plan

- [ ] Catalogue entry marked RESTRICTED
- [ ] Redirect users to ROeID + commercial KYC providers
- [ ] No wrapper

## References

- DEPABD: https://depabd.mai.gov.ro/
- ROeID alternative: https://www.roeid.ro/
- Last manual verification: 2026-05-27
