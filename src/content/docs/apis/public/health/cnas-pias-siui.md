---
slug: cnas-pias-siui
title: CNAS PIAS / SIUI (SOAP)
category: health
institution: Casa Națională de Asigurări de Sănătate (CNAS)
country: RO
status: active
verified_at: 2026-05-27
auth: qualified_cert
protocol: SOAP
openapi_spec: false
sandbox_available: false
contract_required: true
pricing: mandatory
rate_limit: unknown
official_docs: https://portal.cnas.ro/cnas/pias/specificatii
api_base_url: https://portal.cnas.ro/
last_known_version: unknown
mandatory_for_business: true
---

# CNAS PIAS / SIUI (SOAP)

## Overview

The Single Integrated Health Insurance Information System (SIUI) is the core platform used by Romanian healthcare providers (hospitals, clinics, GPs, pharmacies) to report services, validate insured patients, and reconcile claims with CNAS. PIAS ("Platforma Informatică a Asigurărilor de Sănătate") aggregates the WSDL specifications. Integration is mandatory for any contracted provider and uses SOAP over HTTPS with qualified digital certificates.

The portal `portal.cnas.ro` was WAF-blocked to WebFetch (HTTP 403) during the 2026-05-27 sweep, but the service is alive in a browser.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://portal.cnas.ro/cnas/pias/specificatii` | WSDL specifications index |
| SOAP | (per-service WSDL URLs) | Service operations |

WSDL URLs are listed inside the specs index; download via authenticated session.

## Authentication

Qualified digital certificate issued to the healthcare provider (legal entity), typically by STS or another Romanian QTSP. Cert bound to the provider's contract with CNAS.

## Request example

n/a — SOAP envelopes specific to each WSDL. Use `zeep` (Python), `cxf`/`JAX-WS` (Java), or `node-soap` (JS) with mTLS configured against the qualified certificate.

## Response example

n/a — SOAP-XML per WSDL.

## Existing SDKs / wrappers

None publicly maintained. Several Romanian medical-software vendors maintain proprietary SIUI clients under their commercial products.

## Testing approach

- [ ] Direct HTTP test (curl) — **blocked** without browser UA + cert
- [x] **Playwright required** (WAF rejects default fetcher UAs — HTTP 403 in 2026-05-27 sweep)
- [x] Browser UA spoof needed
- [ ] Sandbox available (closed; CNAS provides test environment to contracted providers only)
- [ ] Local simulator

## Known issues / gotchas

- **WAF blocks non-browser UAs** — `portal.cnas.ro` returned HTTP 403 on default fetcher. Use realistic UA + cookies, or drive via Playwright.
- Qualified cert must be in the OS keystore (Windows: cert store; Linux: PKCS#11 token)
- SOAP envelopes are sensitive to whitespace and namespace prefixes — use a WSDL-aware client, not hand-rolled XML
- Test environment access is gated behind the provider contract

## Tutorial seeds (for content pipeline)

- "Calling CNAS SIUI from Python with zeep + qualified cert"
- "Surviving the CNAS portal WAF: realistic UAs and cookie jars"
- "Debugging SOAP faults from PIAS specifications"

## ro-api-hub integration plan

- [ ] Catalogue entry with mandatory-integration warning
- [ ] WSDL mirror (with cert-gated access)
- [ ] No public wrapper (cert-gated)

## References

- PIAS specs: https://portal.cnas.ro/cnas/pias/specificatii
- CNAS: https://cnas.ro/
- Last manual verification: 2026-05-27 (WAF 403 to WebFetch; alive in browser)
