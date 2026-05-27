---
slug: insse-esop
title: INS eSOP (statistical reporting)
category: stats
institution: Institutul Național de Statistică (INS / INSSE)
country: RO
status: active
verified_at: 2026-05-27
auth: basic_auth
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: unknown
official_docs: https://esop.insse.ro/esop-web/
api_base_url: https://esop.insse.ro/esop-web/
last_known_version: unknown
mandatory_for_business: true
---

# INS eSOP (statistical reporting)

## Overview

eSOP is INS's online portal for businesses to submit mandatory statistical surveys (SOP — "Sistem Online de Prelucrare"). Authentication is via login credentials issued to each reporting entity. There is no documented public API; submissions are made through the web UI. Listed here for completeness — companies legally obligated to report can only do so via this portal.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://esop.insse.ro/esop-web/` | Web portal |

## Authentication

Username + password per reporting entity, issued by INS.

## Request example

n/a — web form. Any automation must script the browser flow.

## Response example

n/a (HTML).

## Existing SDKs / wrappers

None known.

## Testing approach

- [ ] Direct HTTP test
- [x] Playwright needed (form-based portal)
- [x] Browser UA spoof may be required
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- No public API — every interaction is via the web UI
- Login credentials are scoped per entity; cannot share across companies
- Survey schedules are calendar-driven (deadlines per questionnaire) — automation must track INS's reporting calendar
- Reporting is **legally mandatory** for selected entities; missing deadlines triggers fines

## Tutorial seeds (for content pipeline)

- "Automating eSOP statistical submissions with Playwright (per-entity)"
- "INS reporting calendar: how to never miss a deadline"

## ro-api-hub integration plan

- [ ] Catalogue entry (gated, no public wrapper)
- [ ] Optional Playwright runner template (per-entity, opt-in)
- [ ] No MCP tool (auth + mandatory nature makes shared access unsafe)

## References

- Portal: https://esop.insse.ro/esop-web/
- INS: https://insse.ro/
- Last manual verification: 2026-05-27
