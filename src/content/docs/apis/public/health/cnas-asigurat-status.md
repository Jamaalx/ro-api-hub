---
slug: cnas-asigurat-status
title: Verificare asigurat (CNAS / SIUI)
category: health
institution: Casa Națională de Asigurări de Sănătate (CNAS)
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: unknown
official_docs: https://siui.casan.ro/asigurati/
api_base_url: https://siui.casan.ro/asigurati/
last_known_version: unknown
mandatory_for_business: false
---

# Verificare asigurat (CNAS / SIUI)

## Overview

Public web form on `siui.casan.ro` that lets any citizen check whether a CNP holder has active health-insurance coverage. Input is CNP + last name; output is the insured status string. No documented public API; access is via the HTML form. Useful for citizen-facing self-service, not for systematic bulk validation (use SIUI SOAP services from a contracted provider for that).

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET/POST | `https://siui.casan.ro/asigurati/` | Web form: CNP + nume → status |

## Authentication

None (input pair acts as a soft identity check).

## Request example

n/a — HTML form submission. Any programmatic use must replay the form fields and parse HTML.

## Response example

n/a — HTML page.

## Existing SDKs / wrappers

None publicly maintained.

## Testing approach

- [ ] Direct HTTP test (form replay possible but fragile)
- [x] Playwright needed for reliable automation
- [x] Browser UA spoof recommended (gov host)
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- **Not a real API** — HTML form only; HTML structure may change without notice
- Submitting CNPs you do not own at scale is a privacy/GDPR issue — limit to self-service use
- Rate limiting / abuse protection not documented; assume present
- For provider workflows, use the cert-gated SIUI SOAP services instead

## Tutorial seeds (for content pipeline)

- "Citizen self-check: am I covered by CNAS?"
- "Why you should not bulk-validate CNPs against the public eligibility form (GDPR)"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] No wrapper (privacy / GDPR risk for shared service)
- [ ] Document the cert-gated alternative for providers

## References

- Form: https://siui.casan.ro/asigurati/
- CNAS: https://cnas.ro/
- Last manual verification: 2026-05-27
