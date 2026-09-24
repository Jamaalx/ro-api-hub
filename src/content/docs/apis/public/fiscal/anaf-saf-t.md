---
slug: anaf-saf-t
title: SAF-T (Standard Audit File for Tax) — Declaration D406
category: fiscal
institution: ANAF (OECD SAF-T standard)
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: qualified_cert
protocol: REST/XML
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: mandatory
rate_limit: "unknown"
official_docs: https://static.anaf.ro/static/10/Anaf/Informatii_R/saf_t.htm
api_base_url: https://webserviced.anaf.ro/SPVWS2/rest/upload
last_known_version: "schema v249 (2026-02-19)"
mandatory_for_business: true
---

# SAF-T (D406)

## Overview

Romania adopted the OECD Standard Audit File for Tax (SAF-T) starting 2022 for large taxpayers, 2023 for medium, 2025 for small. Companies submit declaration **D406** monthly/quarterly as a signed XML conforming to ANAF's local SAF-T schema. The current schema is **v249** (last updated **2026-02-19**). Submission is done either through the SPV web UI/WS or via the official desktop tool DUKIntegrator.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `https://webserviced.anaf.ro/SPVWS2/rest/upload` | Submit D406 XML (declaration type `D406`) |
| GET | `https://webserviced.anaf.ro/SPVWS2/rest/stareMesaj?id_incarcare={id}` | Processing status |
| GET | `https://webserviced.anaf.ro/SPVWS2/rest/descarcare?id={id}` | Download recipisa (acceptance receipt) |

Also delivered offline via **DUKIntegrator** (Java desktop app from ANAF).

## Authentication

Two paths:

- **Programmatic**: OAuth2 + qualified cert through `logincert.anaf.ro`, then SPV WS2 upload.
- **Manual / hybrid**: Generate XML, sign with qualified cert, upload via SPV web UI or DUKIntegrator.

## Request example

```bash
curl -X POST 'https://webserviced.anaf.ro/SPVWS2/rest/upload' \
  -H 'Authorization: Bearer eyJraWQ...' \
  -H 'Content-Type: text/plain' \
  -H 'X-CIF: 43990858' \
  --data-binary @D406_43990858_202604.xml
```

## Response example

```xml
<header xmlns="mfp:anaf:dgti:spv:respUploadFisier:v1"
        dateResponse="202605271500"
        ExecutionStatus="0"
        index_incarcare="111222333"/>
```

## Existing SDKs / wrappers

| Lang | Tool | Status | Notes |
|------|------|--------|-------|
| Java | DUKIntegrator | active (ANAF official) | Validates & signs D406; offline |
| ERP | SAP, Oracle, NAV/BC, SmartBill, Saga, Cielo, etc. | active commercial | Built-in D406 export |
| OSS | — | none mature OSS-only | Most teams build in-house |

## Testing approach

- [x] DUKIntegrator runs offline — use it to validate your XML before any network call
- [x] XSD validation against schema v249 (download from static.anaf.ro)
- [ ] No public sandbox — but SPV WS2 will reject malformed XML with a parseable error
- [x] Local simulator: `aperta-sync/anaf-api-simulator` covers upload + stareMesaj surfaces

## Known issues / gotchas

- Schema **v249** (2026-02-19) — older XMLs are rejected outright
- File size limit: ~500 MB per submission; for large datasets ANAF expects splitting
- Account chart codes must match Romanian PCG (Plan Conturi General) — ERP mappings are the #1 source of validation errors
- Foreign currency moves must include `CurrencyCode` AND `CurrencyAmount` (frequent omission)
- Recipisa MUST be archived 10 years alongside the source files
- Some fields renamed across schema versions (e.g. `AddressDetail`/`StreetName`) — keep mappers versioned

## Tutorial seeds (for content pipeline)

- "Generați D406 SAF-T direct din PostgreSQL în 200 linii"
- "Mapping the RO PCG to OECD SAF-T accounts: a complete reference"
- "Validating SAF-T XML against v249 in CI (xmllint + xsd)"
- "Common DUKIntegrator validation errors and how to fix them"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] Companion validator (Node + libxml2) that ships v249 XSDs
- [ ] Wrapper that submits XML through SPV WS2 with OAuth
- [ ] MCP tool: `saft_validate` (offline) + `saft_submit` (auth)

## References

- SAF-T docs: https://static.anaf.ro/static/10/Anaf/Informatii_R/saf_t.htm
- DUKIntegrator: https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDecl.htm
- Last manual verification: 2026-05-27
