---
slug: cnas-sipe
title: SIPE — Sistemul Informatic Prescripția Electronică
category: health
institution: Casa Națională de Asigurări de Sănătate (CNAS)
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: qualified_cert
protocol: SOAP
openapi_spec: false
sandbox_available: false
contract_required: true
pricing: mandatory
rate_limit: unknown
official_docs: https://portal.cnas.ro/cnas/prescriptia_electronica/
api_base_url: https://portal.cnas.ro/
last_known_version: unknown
mandatory_for_business: true
---

# SIPE — Sistemul Informatic Prescripția Electronică

## Overview

SIPE is the Romanian electronic-prescription system operated by CNAS. Prescribers (doctors) issue and pharmacists dispense prescriptions through SOAP services typically transported alongside SIUI. Integration is mandatory for any healthcare provider in contract with CNAS. The portal `portal.cnas.ro` was WAF-blocked to WebFetch during the 2026-05-27 sweep but the service is alive in a browser.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://portal.cnas.ro/cnas/prescriptia_electronica/` | SIPE landing + specifications |
| SOAP | (per-operation WSDL URLs) | Prescribe, validate, dispense |

## Authentication

Qualified digital certificate per medical professional / provider.

## Request example

n/a — SOAP envelopes per WSDL.

## Response example

n/a — SOAP-XML per WSDL.

## Existing SDKs / wrappers

None publicly maintained; integrations are embedded in Romanian EMR/EHR products under commercial license.

## Testing approach

- [ ] Direct HTTP test (curl) — blocked without UA + cert
- [x] **Playwright required** for portal navigation (WAF blocks default UAs)
- [x] Browser UA spoof needed
- [ ] Sandbox available (closed)
- [ ] Local simulator

## Known issues / gotchas

- **WAF blocks non-browser UAs** — `portal.cnas.ro` returned HTTP 403 on default fetcher (2026-05-27)
- Often transported alongside SIUI — cert/setup overlap with `cnas-pias-siui`
- Test access is gated behind the provider contract
- Doctor's certificate identity is encoded into the prescription — automation requires that doctor's hardware token

## Tutorial seeds (for content pipeline)

- "Issuing electronic prescriptions via SIPE SOAP: a developer walkthrough"
- "Doctor certs and SIPE: managing hardware tokens for prescription workflows"

## ro-api-hub integration plan

- [ ] Catalogue entry with mandatory warning
- [ ] WSDL mirror (cert-gated)
- [ ] No public wrapper

## References

- SIPE landing: https://portal.cnas.ro/cnas/prescriptia_electronica/
- CNAS: https://cnas.ro/
- Last manual verification: 2026-05-27 (WAF 403 to WebFetch; alive in browser)
