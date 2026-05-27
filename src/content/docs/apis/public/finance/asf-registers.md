---
slug: asf-registers
title: ASF Authorized Entities Registers
category: finance
institution: Autoritatea de Supraveghere Financiară (ASF)
country: RO
status: broken
verified_at: 2026-05-27
auth: none
protocol: static_files
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: none_documented
official_docs: https://www.asfromania.ro/
api_base_url: unknown
last_known_version: unknown
mandatory_for_business: false
---

# ASF Authorized Entities Registers

## Overview

ASF maintains public registers of all authorized financial entities in Romania: insurers, brokers, asset managers, pension funds, investment firms, crypto service providers, etc. Each register is browsable on asfromania.ro with XLS download available per register.

> **Catalogue fix (verified 2026-05-27):** the previously documented URL `https://www.asfromania.ro/en/a/1544/` returns a 404 Symfony `ResourceNotFoundException`. The canonical entry point is the institution root `https://www.asfromania.ro/` and the menu path **Registers** (RO: **Registre**). The exact replacement deep-link must be re-discovered through the live menu — marked **unknown** until re-verified.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://www.asfromania.ro/` | Site root — navigate to Registers section |
| GET | `https://www.asfromania.ro/en/a/1544/` | Historically the EN registers page (returns 404 since 2026) |
| GET | Per-register XLS download links | Discoverable from each register page |

No REST API. Distribution is HTML + XLS.

## Authentication

None.

## Request example

```bash
curl -A 'Mozilla/5.0' 'https://www.asfromania.ro/'
```

## Response example

HTML landing page; each Register subpage links to an XLS/CSV of authorized entities.

## Existing SDKs / wrappers

None public. Some commercial KYC/AML tools scrape ASF registers internally but do not expose them.

## Testing approach

- [x] Direct HTTP with browser UA
- [x] Playwright recommended for menu navigation
- [x] XLS parser (e.g. `xlsx` / `openpyxl`) for the downloaded registers
- [ ] No sandbox

## Known issues / gotchas

- **URL fix needed**: old `/en/a/1544/` deep-link is dead — locate replacement
- Site is bilingual but EN sometimes lags behind RO — prefer the RO version
- XLS schemas differ per register — no unified column model
- Authorization status changes are not pushed; you must re-pull the whole register
- Some registers are split across multiple files (active / withdrawn / suspended)

## Tutorial seeds (for content pipeline)

- "Mirror all ASF authorization registers into PostgreSQL"
- "AML KYC: cross-checking a fintech counterparty against ASF in real time"
- "Tracking authorization changes via daily XLS diffs"

## ro-api-hub integration plan

- [ ] Catalogue entry with `broken` status until replacement URL confirmed
- [ ] Re-verify ASF site menu and update catalogue
- [ ] Playwright scraper materializing each register into Supabase
- [ ] REST: `GET /v1/asf/registers`, `GET /v1/asf/registers/{slug}/entities`
- [ ] MCP tool: `asf_lookup_entity` (by CUI / name)

## References

- ASF root: https://www.asfromania.ro/
- Stale link (404): https://www.asfromania.ro/en/a/1544/
- Last manual verification: 2026-05-27
