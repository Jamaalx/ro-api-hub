---
slug: ancpi-eterra
title: eTerra (ANCPI cadastral portal)
category: geo
institution: Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI)
country: RO
status: stale
verified_at: 2026-05-27
auth: qualified_cert
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: true
pricing: enterprise
rate_limit: unknown
official_docs: https://eterra.ancpi.ro/
api_base_url: https://eterra.ancpi.ro/
last_known_version: unknown
mandatory_for_business: false
---

# eTerra (ANCPI cadastral portal)

## Overview

Restricted ANCPI portal historically used by notaries, surveyors, and authorized professionals to query and update cadastral records. The legacy `eterra.ancpi.ro` host now issues a 301 redirect — the active replacement is **MyEterra** (`myeterra.ancpi.ro`). Listed here for completeness; new integrations should target MyEterra.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://eterra.ancpi.ro/` | Legacy portal (301 → MyEterra) |

## Authentication

Qualified digital certificate issued to authorized professionals (notar, expert cadastral, etc.). No public credential issuance.

## Request example

n/a — no public API; programmatic access historically required institutional contract and a qualified certificate bound to the requesting professional.

## Response example

n/a

## Existing SDKs / wrappers

None known.

## Testing approach

- [ ] Direct HTTP test — only the 301 redirect is observable
- [x] Browser + qualified cert required for the live app
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- **Maintenance page after the ransomware attack (2026-09-24):** `eterra.ancpi.ro` answers 403 with an ANCPI "Acces restricționat — Mentenanță programată" page. ANCPI was hit by ransomware on 2026-07-14; e-Terra was restarted on 2026-08-11 (for authorised professionals and notaries) and the payment link re-enabled on 2026-08-20. Whether our 403 is the maintenance page for everyone or an IP filter could not be distinguished — check in a browser before relying on it.
- **301 redirect**: `eterra.ancpi.ro` now redirects to MyEterra; do not hardcode the old host
- Closed user group — no API contract published
- Any third-party integration requires a formal partnership with ANCPI

## Tutorial seeds (for content pipeline)

- "From eTerra to MyEterra: migrating cadastral workflows"
- "Who can access the ANCPI professional portal and how to enroll"

## ro-api-hub integration plan

- [ ] Catalogue entry as historical reference
- [ ] Redirect users to the MyEterra catalogue page
- [ ] No wrapper planned (closed access)

## References

- Legacy portal: https://eterra.ancpi.ro/
- Successor: https://myeterra.ancpi.ro/
- ANCPI notice (2026-08-20): https://www.ancpi.ro/
- Last manual verification: 2026-05-27
