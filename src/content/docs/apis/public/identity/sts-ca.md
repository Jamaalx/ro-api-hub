---
slug: sts-ca
title: STS CA — Qualified Certificates
category: identity
institution: Serviciul de Telecomunicații Speciale (STS)
country: RO
status: active
verified_at: 2026-05-27
auth: qualified_cert
protocol: REST/XML
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: unknown
official_docs: https://ca.stsisp.ro/politici
api_base_url: https://ca.stsisp.ro/
last_known_version: "n/a"
mandatory_for_business: false
---

# STS CA — Qualified Certificates

## Overview

STS (Special Telecommunications Service) operates a qualified Certificate Authority issuing X.509 certificates used across the Romanian e-government stack (e.g. for ANAF SPV access, qualified signatures, public-sector authentication). The CA exposes standard PKI primitives: certificate policy documents, CRL distribution points, and OCSP responders. There is no "REST API" in the modern sense — interaction is via standard PKI protocols and certificate lifecycle forms.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://ca.stsisp.ro/politici` | Certification Practice Statement (CPS) and policies |
| GET | `https://ca.stsisp.ro/repository/` | Issued cert repository (typical) |
| GET | (CRL URLs in cert) | Certificate Revocation Lists |
| POST | (OCSP URL in cert) | OCSP revocation checks |

## Authentication

n/a — public PKI artifacts. Certificate issuance requires identity proofing.

## Request example

```bash
# OCSP check (URL extracted from the certificate's AIA extension)
openssl ocsp -issuer issuer.pem -cert subject.pem -url http://ocsp.stsisp.ro/ -resp_text
```

## Response example

DER-encoded OCSP response (binary) or PEM CRL.

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | OpenSSL, node-forge, cryptography (Py) | — | Standard PKI libraries |

## Testing approach

- [x] Direct HTTP test (curl / openssl)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- Documentation is policy-document PDFs, not a developer guide.
- Trust chain: ensure STS root + intermediate are installed before validating end-entity certs.
- OCSP responses may be cached aggressively by intermediaries.

## Tutorial seeds (for content pipeline)

- "Validare certificat calificat STS în Node.js (OCSP + CRL)"
- "Configurare ANAF SPV cu un certificat STS — pas cu pas"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] Document trust chain + CRL/OCSP URLs
- [ ] Helper utility for cert validation in the wrapper

## References

- Policies: https://ca.stsisp.ro/politici
- STS: https://www.stsnet.ro/
- Last manual verification: 2026-05-27
