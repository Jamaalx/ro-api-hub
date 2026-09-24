---
slug: ghiseul-snep
title: Ghișeul.ro — SNEP (Sistemul Național Electronic de Plată)
category: gov
institution: ADR / STS (operator Ghișeul)
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: contract
protocol: REST/JSON
openapi_spec: false
sandbox_available: true
contract_required: true
pricing: free
rate_limit: unknown
official_docs: https://www.ghiseul.ro/
api_base_url: https://www.ghiseul.ro/
last_known_version: "n/a"
mandatory_for_business: false
---

# Ghișeul.ro — SNEP

## Overview

Ghișeul.ro is the National Electronic Payment System (SNEP) — the Romanian government's unified portal for paying taxes, fines, fees, and other obligations to ANAF, local authorities, MAI, etc. It processed ~8.5M transactions in 2024. Institutions integrate via SNEP enrollment (contract with operator) to receive payments; citizens pay by card. The site is fronted by a WAF that returns HTTP 403 to automated User-Agents. There is no public REST API for end-users; integration is institution-only.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://www.ghiseul.ro/` | Citizen portal |
| — | (institutional API) | Enrolled institutions only |

## Authentication

- Citizens: optional account (CNP-based) or guest pay-by-card.
- Institutions: signed agreement + technical credentials; integration spec delivered privately.

## Request example

No public API.

```bash
# 403 from non-browser UA
```

## Response example

HTML / receipts.

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | — | — | None public — institutional only |

## Testing approach

- [ ] Direct HTTP test (curl / fetch) — 403
- [x] Playwright needed (JS-rendered + WAF)
- [x] Browser UA spoof required (default UA gets 403)
- [x] Sandbox available (institutional)
- [ ] Local simulator

## Known issues / gotchas

- **Blocks bots, verified manually 2026-09-24:** the link checker gets HTTP 403 (Cloudflare "Just a moment…" challenge); the page exists for a human browser (Cloudflare JS challenge — passes in a normal browser). Not a dead link — keep it.
- WAF blocks default UAs (HTTP 403 verified 2026-05-27).
- Citizen-facing flows include CAPTCHA / friction by design.
- Institutional integration is contract-only; technical docs are NDA.

## Tutorial seeds (for content pipeline)

- "Cum înrolezi o instituție publică în Ghișeul.ro (pași contractuali)"
- "De ce un primar ar vrea SNEP înainte de a-și face propriul gateway"

## ro-api-hub integration plan

- [ ] Catalogue entry noting institution-only API
- [ ] No public wrapper
- [ ] Document the enrolment process for partners

## References

- Site: https://www.ghiseul.ro/
- Concept article: https://ithub.gov.ro/2016/12/02/ghiseul-ro-2-0/
- Last manual verification: 2026-05-27
