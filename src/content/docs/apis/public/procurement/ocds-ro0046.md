---
slug: ocds-ro0046
title: OCDS RO — RO0046 commitment
category: procurement
institution: ANAP / ADR (sub OGP RO)
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: unknown
official_docs: https://www.opengovpartnership.org/members/romania/commitments/RO0046/
api_base_url: (TBD — pilot)
last_known_version: "OCDS 1.1"
mandatory_for_business: false
---

# OCDS RO — RO0046

## Overview

Romania committed under Open Government Partnership commitment RO0046 to publish public procurement data in the international Open Contracting Data Standard (OCDS 1.1). When fully delivered, this provides machine-readable releases for each procurement stage (planning, tender, award, contract, implementation), enabling cross-country analytics and corruption-risk research. As of 2026-05-27 the implementation is in progress — partial data may be available, full coverage not yet guaranteed. Track the OGP commitment page for status updates.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | (TBD — pilot feed URL) | OCDS releases / packages |
| GET | `https://www.opengovpartnership.org/members/romania/commitments/RO0046/` | Commitment tracker |

## Authentication

None expected for published feed.

## Request example

OCDS standard structure:

```bash
curl 'https://example-ocds-feed.ro/releases?date_from=2026-01-01'
```

## Response example

```json
{
  "releases": [
    {
      "ocid": "ocds-xxxx-001",
      "date": "2026-04-15T10:00:00Z",
      "tag": ["tender"],
      "tender": { "title": "...", "value": {"amount": 100000, "currency": "RON"} }
    }
  ]
}
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Python | `ocdskit` | active | OCDS official toolkit |
| — | Open Contracting Partnership tools | — | https://standard.open-contracting.org/ |

## Testing approach

- [x] Direct HTTP test (curl / fetch) — once feed URL public
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- **Blocks bots, verified manually 2026-09-24:** the link checker gets HTTP 403 (Cloudflare "Just a moment…" challenge); the page exists for a human browser (Cloudflare JS challenge on opengovpartnership.org — passes in a normal browser). Not a dead link — keep it.
- Pilot status — coverage incomplete, schema versions may shift.
- Feed URL still being finalized.
- Mapping SICAP fields → OCDS is non-trivial; cross-check definitions.

## Tutorial seeds (for content pipeline)

- "Open Contracting Data Standard pentru România: ce e gata și ce nu"
- "Cum compari licitațiile RO cu alte țări folosind OCDS"

## ro-api-hub integration plan

- [ ] Catalogue entry tracking pilot status
- [ ] Integrate ocdskit + cache when feed becomes stable
- [ ] MCP tool: `query_public_procurement(filters)` once available

## References

- Commitment: https://www.opengovpartnership.org/members/romania/commitments/RO0046/
- OCDS spec: https://standard.open-contracting.org/
- Last manual verification: 2026-05-27
