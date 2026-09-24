---
slug: e-guvernare
title: e-Guvernare.ro — Aggregator de servicii
category: gov
institution: Autoritatea pentru Digitalizarea României (ADR)
country: RO
status: suspended
verified_at: 2026-05-27
auth: qualified_cert
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: unknown
official_docs: https://roepas.ro/
api_base_url: https://www.e-guvernare.ro/
last_known_version: "n/a"
mandatory_for_business: false
---

# e-Guvernare.ro

## Overview

e-Guvernare.ro is an aggregator portal listing electronic public services for citizens and businesses, with authenticated submission of various forms (declarations, requests). Authentication typically uses qualified digital certificates (STS) or ROeID. There is no public REST API exposing the service catalogue or submissions; the platform is intended for human users. The newer catalog at serviciipublice.gov.ro is a more structured directory of public services.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://www.e-guvernare.ro/` | Portal home |

## Authentication

Qualified digital certificate (STS-issued typically) or ROeID for citizen flows.

## Request example

No public API.

```bash
# Forms only
```

## Response example

HTML / signed PDF acknowledgements.

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | — | — | None known |

## Testing approach

- [ ] Direct HTTP test (curl / fetch)
- [x] Playwright needed
- [x] Browser UA spoof recommended
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- **Replaced by ROePAS (2026-09-24):** `www.e-guvernare.ro` refuses connections on :443 (it still resolves). ADR launched **ROePAS** (`https://roepas.ro`) in production on 2026-03-12 as the single point of access for digital public services, migrating 5,000+ procedures from PCUe; from 2026-06-30 requests go through ROePAS. `official_docs` now points to ROePAS. The `edirect.e-guvernare.ro` sub-portal still answers.
- Forms-only portal; no documented API.
- Many listed services are external links to sector portals (ANAF, MAI, etc.).
- Some flows require qualified certificate at signature time.

## Tutorial seeds (for content pipeline)

- "Diferența între e-guvernare.ro și serviciipublice.gov.ro"
- "Ce poți face online cu un certificat STS în 2026"

## ro-api-hub integration plan

- [ ] Catalogue entry as aggregator
- [ ] Link to serviciipublice.gov.ro catalog for structured list
- [ ] No wrapper

## References

- Site: https://www.e-guvernare.ro/
- Modern catalog: https://serviciipublice.gov.ro/
- ROePAS launch announcement: https://roepas.ro/ro/w/romanian-digital-authority-launches-as-romania-s-single-access-point-for-public-services
- ADR — ROePAS beta: https://www.adr.gov.ro/en/articole/lansarea-versiunii-beta-a-platformei-roepas---punct-unic-de-acces-la-serviciile-publice-digitale---testare-pentru-cetateni-administratii-companii
- Last manual verification: 2026-05-27
