---
slug: saga-soft
title: Saga Soft (desktop only, no REST API)
category: invoicing
institution: Saga Software SRL
country: RO
status: broken
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: subscription
rate_limit: unknown
official_docs: https://www.sagasoft.ro/
api_base_url: https://www.sagasoft.ro/
last_known_version: unknown
mandatory_for_business: false
---

# Saga Soft (desktop only, no REST API)

## Overview

Saga (C/MP/PS/F) is the most-used accounting software at Romanian accountants' firms (Cluj-based vendor), but it remains a **Windows desktop application** with a Firebird/local DB. No official REST API is published. Integrations are typically done via (a) Oblio/FGO sync connectors that import from Saga's exported XML/SAF-T, (b) e-Factura XML import/export.

## Endpoints

None (no public REST surface).

## Authentication

N/A.

## Request example

N/A.

## Response example

N/A.

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Sync | Oblio ↔ Saga connector | official (Oblio) | Bidirectional import |
| Sync | FGO ↔ Saga connector | official (FGO) | Bidirectional import |
| XML | SAF-T D406 export | built-in | ANAF format |

## Testing approach

- [ ] Direct HTTP test
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [x] Local simulator: install Saga locally (free for low usage)

## Known issues / gotchas

- **No REST API.** Desktop-only with Firebird local DB.
- Direct DB writes voids support contract — DO NOT touch the .fdb file.
- Recommended integration: route through Oblio or FGO sync.
- SAF-T D406 export for ANAF is XML.
- Frequent format changes when ANAF updates D406 schema.

## Tutorial seeds (for content pipeline)

- "How to sync Saga Soft to e-Factura via Oblio (workaround)"
- "Exporting SAF-T D406 from Saga and validating against ANAF schema"
- "Why Saga has no REST API and the accountant lock-in problem"

## ro-api-hub integration plan

- [ ] Catalogue stub (status=broken)
- [ ] Document Oblio / FGO sync workarounds
- [ ] No MCP tool (no API surface)
- [ ] Provide SAF-T conversion samples

## References

- Public site: https://www.sagasoft.ro/
- Oblio sync help: https://www.oblio.eu
- FGO sync help: https://www.fgo.ro
- Last manual verification: 2026-05-27
