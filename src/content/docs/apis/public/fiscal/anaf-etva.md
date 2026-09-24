---
slug: anaf-etva
title: RO e-TVA (Pre-filled VAT Returns)
category: fiscal
institution: ANAF / Ministerul Finanțelor
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: qualified_cert
protocol: REST/XML
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: "unknown"
official_docs: https://mfinante.gov.ro/en/web/efactura/
api_base_url: https://webserviced.anaf.ro/SPVWS2/rest (download via SPV)
last_known_version: "current (2025 launch)"
mandatory_for_business: true
---

# RO e-TVA — Pre-filled VAT Returns

## Overview

e-TVA is the system through which ANAF generates a **pre-filled VAT return** (D300) for each VAT-paying taxpayer based on the data it already holds: e-Factura submissions, e-Transport declarations, SAF-T, customs (eDosar Vamă), e-Casa de Marcat. The taxpayer downloads the draft XML from SPV, compares it to their own records, and either accepts or submits corrections (notificare de conformare).

## Endpoints

There is no dedicated `/etva/` REST endpoint — distribution is via SPV WS2 download (the pre-filled XML appears in the SPV inbox each declaration period).

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://webserviced.anaf.ro/SPVWS2/rest/listaMesaje?...` | Discover pre-filled D300 notification |
| GET | `https://webserviced.anaf.ro/SPVWS2/rest/descarcare?id={id}` | Download pre-filled D300 XML |
| POST | `https://webserviced.anaf.ro/SPVWS2/rest/upload` | Submit corrected D300 / notificare de conformare |

## Authentication

OAuth2 + qualified cert through `logincert.anaf.ro` (same client as e-Factura / SPV).

## Request example

```bash
# 1. Find the pre-filled D300 in the inbox
curl 'https://webserviced.anaf.ro/SPVWS2/rest/listaMesaje?zile=30&cif=43990858' \
  -H 'Authorization: Bearer eyJraWQ...'

# 2. Download it
curl 'https://webserviced.anaf.ro/SPVWS2/rest/descarcare?id=PREFILLED_ID' \
  -H 'Authorization: Bearer eyJraWQ...' \
  -o D300_prefilled.xml
```

## Response example

D300 XML with all rows already populated (`rd1..rd44`) plus a `<diferente>` block highlighting deltas vs. the taxpayer's own data ANAF received elsewhere.

## Existing SDKs / wrappers

| Lang | Tool | Status | Notes |
|------|------|--------|-------|
| ERP | SmartBill, Saga, FGO, Oblio (all major RO accounting suites) | active 2026 | Built-in reconciliation against e-TVA draft |
| OSS | — | none yet | Too new |

## Testing approach

- [ ] No public sandbox — pre-filled drafts are tenant-specific
- [x] Unit-test the reconciliation logic with anonymized real fixtures
- [x] `aperta-sync/anaf-api-simulator` can serve a stubbed pre-filled XML for E2E tests

## Known issues / gotchas

- Notificare de conformare deadline is short (5 working days) — automate alerting
- Pre-filled draft uses ANAF's view of e-Factura — if your accounting system uses different exchange rates or VAT categorisations, expect persistent deltas
- Some receipts from e-Casa de Marcat have late reporting → drafts may shift after the cutoff
- B2C invoices submitted via e-Factura B2C show up here too (since 2026)

## Tutorial seeds (for content pipeline)

- "Reconciling your D300 with ANAF's pre-filled draft (line by line)"
- "Why your e-TVA differs from your SmartBill report — top 7 causes"
- "Auto-respond to notificare de conformare in your accounting system"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] Wrapper that watches SPV inbox for pre-filled D300 and emits a webhook
- [ ] MCP tool: `etva_get_draft`, `etva_diff_with_local`
- [ ] Tutorial repo using a local SmartBill-like ledger

## References

- e-Factura / e-TVA hub: https://mfinante.gov.ro/en/web/efactura/
- ANAF services index: https://www.anaf.ro/anaf/internet/ANAF/servicii_online/
- Last manual verification: 2026-05-27
