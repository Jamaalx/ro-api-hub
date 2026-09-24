---
slug: telekom-ro
title: Telekom Romania Mobile (defunct)
category: telecom
institution: Telekom Romania Mobile (now part of Vodafone / Digi)
country: RO
status: broken
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: true
pricing: enterprise
rate_limit: unknown
official_docs: https://www.telekom.ro
api_base_url: https://www.telekom.ro
last_known_version: unknown
mandatory_for_business: false
---

# Telekom Romania Mobile (defunct)

## Overview

Telekom Romania Mobile was absorbed during 2024–2025 — the fixed business was sold to Orange Romania (closed 2021) and the mobile business to Digi Romania. The brand and standalone APIs are effectively retired. Any existing legacy developer integrations should be migrated to Orange (for fixed) or Digi (for mobile / spectrum-derived) accounts.

## Endpoints

None active. Legacy public-facing developer portal taken down.

## Authentication

N/A.

## Request example

N/A.

## Response example

N/A.

## Existing SDKs / wrappers

None maintained.

## Testing approach

- [ ] Direct HTTP test
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- Brand defunct; redirects to telekom.ro landing page that points to Orange/Digi successor offerings.
- Legacy SIM Management APIs migrated to Digi enterprise portal — different credentials.
- Old `developer.telekom.ro` no longer resolves.

## Tutorial seeds (for content pipeline)

- "Migrating from Telekom RO billing exports to Orange / Digi successor"
- "History of RO telecom consolidation 2020–2025 (developer perspective)"
- "How to scrape archived Telekom RO docs from web.archive.org for legacy integrations"

## ro-api-hub integration plan

- [ ] Catalogue stub (status=broken, defunct)
- [ ] Redirect notice to Orange / Digi entries
- [ ] No MCP tool (entity dissolved)
- [ ] Archive references for historical context

## References

- Public site (redirects): https://www.telekom.ro
- Orange acquisition press: https://www.orange.ro
- Digi acquisition press: https://www.digi-communications.ro/
- Last manual verification: 2026-05-27
