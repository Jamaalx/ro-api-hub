---
slug: anspdcp
title: ANSPDCP — Autoritatea Națională pentru Supravegherea Prelucrării Datelor cu Caracter Personal
category: regulators
institution: ANSPDCP
country: RO
status: active
verified_at: 2026-05-27
auth: none
protocol: static_files
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: unknown
official_docs: https://www.dataprotection.ro/
api_base_url: https://www.dataprotection.ro/
last_known_version: "n/a"
mandatory_for_business: false
---

# ANSPDCP — Autoritatea pentru protecția datelor

## Overview

ANSPDCP is Romania's data protection authority (GDPR supervisory authority). The website publishes news, sanctions/fines decisions, FAQ, and forms for breach notification, DPO appointment, and complaints. Verified active 2026-05-27 (latest news 2026-05-25). There is no public REST API — content is browsable HTML + downloadable PDFs. Sanctions data is published per-decision as press releases and can be scraped under standard fair-use limits.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://www.dataprotection.ro/` | Site home |
| GET | `https://www.dataprotection.ro/?page=Comunicate_Presa_2026` | Press releases (sanctions) per year |

## Authentication

None.

## Request example

```bash
curl 'https://www.dataprotection.ro/?page=Comunicate_Presa_2026' \
  -H 'User-Agent: Mozilla/5.0'
```

## Response example

HTML.

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | — | — | None official; some legal-tech scrapers exist |

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [x] Browser UA spoof recommended
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- HTML structure may shift; selectors break over time.
- Sanction amounts are mentioned inline in press release text — NLP needed for structured extraction.
- Forms for breach notification submit by email, not API.

## Tutorial seeds (for content pipeline)

- "Tracker sancțiuni GDPR România: extragere din ANSPDCP cu LLM"
- "Cum notifici un incident de securitate către ANSPDCP — flux corect"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] Scheduled scraper for press releases → structured JSON
- [ ] MCP tool: `search_gdpr_sanctions(year, keyword)`

## References

- Site: https://www.dataprotection.ro/
- Last manual verification: 2026-05-27 (latest news 2026-05-25)
