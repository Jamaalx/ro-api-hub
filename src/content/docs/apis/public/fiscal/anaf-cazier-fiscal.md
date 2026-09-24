---
slug: anaf-cazier-fiscal
title: Cazier Fiscal (Fiscal Record)
category: fiscal
institution: ANAF
country: RO
status: gated
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: qualified_cert
protocol: REST/XML
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: unknown
official_docs: https://www.anaf.ro/anaf/internet/ANAF/servicii_online/
api_base_url: unknown (inter-institutional)
last_known_version: unknown
mandatory_for_business: false
---

# Cazier Fiscal (Fiscal Record)

## Overview

The Cazier Fiscal is the official ANAF document listing fiscal contraventions and sanctions for a person or company. It is required for: company formation, public procurement participation, certain licensing procedures, banking onboarding. Issuance is done either at the ANAF counter, through SPV (for the taxpayer themselves), or via inter-institutional channels (ONRC, banks, ministries).

There is **no public B2B API** — third parties cannot pull another entity's cazier. The taxpayer must obtain it themselves from SPV and forward.

## Endpoints

Programmatic issuance is restricted. Practical access paths:

| Path | Audience | Notes |
|------|----------|-------|
| SPV web UI / WS2 | Taxpayer self-service | Submit cerere → receive PDF in inbox |
| ONRC | Notaries, registry | Auto-attached during company formation |
| Inter-institutional | Other gov bodies | Closed channel, contract required |
| ANAF counter | Anyone | Paper submission, slow |

## Authentication

For taxpayer self-service: qualified cert via SPV (OAuth2 `logincert.anaf.ro`). For inter-institutional access: signed gov-to-gov agreement; not accessible to private business.

## Request example

```bash
# Submit cerere de cazier (form 502) via SPV upload
curl -X POST 'https://webserviced.anaf.ro/SPVWS2/rest/upload' \
  -H 'Authorization: Bearer eyJraWQ...' \
  -H 'Content-Type: text/plain' \
  --data-binary @cerere_cazier_502.xml
```

## Response example

PDF (signed by ANAF) delivered to the SPV inbox within minutes / hours, downloadable via:

```
GET https://webserviced.anaf.ro/SPVWS2/rest/descarcare?id={id}
```

## Existing SDKs / wrappers

None public. ERPs and notarial software embed the SPV upload flow but don't expose it as a reusable wrapper.

## Testing approach

- [ ] No sandbox — every test consumes a real cazier slot
- [x] Validate cerere XML against form 502 XSD before submitting
- [ ] Mock the upload in dev with `aperta-sync/anaf-api-simulator`

## Known issues / gotchas

- A taxpayer can only pull their OWN cazier — third-party pulls require power-of-attorney + manual handling
- PDF expiry: typically valid 30 days from issuance for procurement use
- Inter-institutional integration is NOT a commercial product — do not promise it to clients
- Avoid storing the PDF in shared S3 buckets — it contains personal/fiscal data covered by GDPR

## Tutorial seeds (for content pipeline)

- "Solicită caziere fiscale prin SPV pentru toate filialele unei companii"
- "Power-of-attorney pattern: obținerea cazierului unui client în mod legal"
- "GDPR retention rules for cazier fiscal PDFs"

## ro-api-hub integration plan

- [ ] Catalogue entry with `gated` status
- [ ] Wrapper for the SPV self-service path (taxpayer's own cazier)
- [ ] MCP tool: `cazier_request_self`, `cazier_inbox_check`
- [ ] Do NOT attempt third-party cazier — outside scope

## References

- ANAF services index: https://www.anaf.ro/anaf/internet/ANAF/servicii_online/
- Last manual verification: 2026-05-27
