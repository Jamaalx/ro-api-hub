---
slug: ancpi-myeterra
title: MyEterra (ANCPI cadastral portal)
category: geo
institution: Agenția Națională de Cadastru și Publicitate Imobiliară (ANCPI)
country: RO
status: gated
verified_at: 2026-05-27
auth: qualified_cert
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: true
pricing: enterprise
rate_limit: unknown
official_docs: https://myeterra.ancpi.ro/
api_base_url: https://myeterra.ancpi.ro/
last_known_version: unknown
mandatory_for_business: false
---

# MyEterra (ANCPI cadastral portal)

## Overview

Current ANCPI portal for authorized cadastral professionals (notaries, surveyors, public institutions). Replaces the legacy `eterra.ancpi.ro`. Provides search, requests for extras de carte funciară, and submission of cadastral documentation. Programmatic access is gated behind institutional contracts and qualified certificates.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://myeterra.ancpi.ro/` | Portal login |

Underlying REST endpoints are not publicly documented.

## Authentication

Qualified digital certificate bound to an authorized professional / institution. Issued via ANCPI's enrollment process, not self-service.

## Request example

n/a — closed access. Any integration is via institutional partnership.

## Response example

n/a

## Existing SDKs / wrappers

None known publicly. Some legal-tech vendors (notary software) bundle MyEterra integration under NDA.

## Testing approach

- [ ] Direct HTTP test
- [x] Playwright + qualified cert (browser flow) for any UI automation
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- Closed user group — no public OpenAPI
- Qualified cert must be installed in the browser/OS keystore for any access
- Endpoint surface and request shapes are subject to change without public notice

## Tutorial seeds (for content pipeline)

- "How notaries connect to MyEterra"
- "Automating extras de carte funciară requests for legal tech"

## ro-api-hub integration plan

- [ ] Catalogue entry as gated service
- [ ] Document enrollment path
- [ ] No wrapper planned without ANCPI partnership

## References

- Portal: https://myeterra.ancpi.ro/
- ANCPI: https://www.ancpi.ro/
- Last manual verification: 2026-05-27
