---
slug: companiidestat-ro
title: "companiidestat.ro: Open Data on Romanian State-Owned Companies"
category: community
institution: companiidestat.ro (independent data-journalism project)
country: RO
status: active
verified_at: 2026-10-18
auth: none
protocol: static_files
openapi_spec: true
sandbox_available: false
contract_required: false
pricing: free
rate_limit: none_documented
official_docs: https://companiidestat.ro/date/
api_base_url: https://companiidestat.ro/date/v1/
last_known_version: "v1"
mandatory_for_business: false
---

# companiidestat.ro: Open Data on Romanian State-Owned Companies

## Overview

Read-only open data layer behind companiidestat.ro, a data-journalism project on Romania's state-owned companies (central and local). Every resource is a static JSON file served over HTTP GET. It joins, by CUI, sources that are otherwise scattered across PDFs and bulk files: MFin/ANAF annual financial statements filtered to state-owned companies (2019–2025), the AMEPIP individual evaluation sheets (Annex 1 for 146 central companies, Annex 3 for 1,210 local ones, parsed from PDF), AMEPIP nominal management pay, local-budget subsidies paid by municipalities to their companies, and the BVB-listed subset.

The search index covers 1,904 companies. Licence CC BY 4.0, attribution "companiidestat.ro". Disclosure: this entry was added by the project's author.

## Endpoints

The manifest `index.json` is the source of truth for what is published as a stable API (16 resources on 2026-10-18).

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://companiidestat.ro/date/v1/index.json` | Manifest: every endpoint with description, keys, sources, licence |
| GET | `https://companiidestat.ro/date/v1/openapi.json` | OpenAPI 3.1 description |
| GET | `https://companiidestat.ro/date/v1/companii_search.json` | Index of all companies keyed by CUI (name, county, sector, tier, BVB ticker, status) |
| GET | `https://companiidestat.ro/date/v1/companii/{cui}.json` | Full profile of one company: financial history, AMEPIP verdicts, pay, registry status |
| GET | `https://companiidestat.ro/date/v1/mfin_bilanturi_{year}.json` | Balance-sheet slice for one year, 2019–2025, state-owned companies only |
| GET | `https://companiidestat.ro/date/v1/anexa1_summary.json` | AMEPIP evaluation sheets, central companies |
| GET | `https://companiidestat.ro/date/v1/anexa3_summary.json` | AMEPIP evaluation sheets, local companies |
| GET | `https://companiidestat.ro/date/v1/subventii-locale-data.json` | Subsidies from local budgets to municipal companies, 2024–2025 |
| GET | `https://companiidestat.ro/date/v1/listed-soes.json` | State-owned companies listed on the Bucharest Stock Exchange |

## Authentication

None.

## Request example

```bash
curl -s https://companiidestat.ro/date/v1/companii/13267213.json | jq '{nume, sector_label, judet_nume, tier}'
```

## Response example

Top-level keys of a company profile (Hidroelectrica, CUI 13267213):

```json
[
  "cui", "nume", "nume_short", "regnr", "judet_cod", "judet_nume",
  "sector_key", "sector_label", "caen", "ticker", "listat_bvb",
  "status_onrc", "tier", "fin_history", "salarii", "anexa1", "anexa3",
  "mfin", "mfin_2024", "mfin_2025", "fin_2025", "derived_status_2025",
  "anaf_inactiv_fiscal", "anaf_radiere", "anaf_radiere_cauza", "..."
]
```

`companii_search.json`:

```json
{
  "companii": {
    "524277": {
      "cui": "524277",
      "nume": "AGROPRODCOM ODORHEIU SECUIESC SA",
      "judet_nume": "Harghita",
      "sector_label": "Agricultură",
      "derived_status": "PIERDERE",
      "listat_bvb": false
    }
  },
  "search_tokens": { "...": "..." },
  "meta": { "total": 1904, "years": [2019, 2020, 2021, 2022, 2023, 2024] }
}
```

## Existing SDKs / wrappers

None. Plain JSON over GET.

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- **Keys and labels are in Romanian** (`nume`, `judet_nume`, `cifra_afaceri`, ...).
- **Files are large.** `anexa3_summary.json` is about 8 MB; fetch per-company profiles when you need one company.
- **"No data" means not found in the MFin bulk files nor in the ANAF per-CUI service.** It does not prove the company did not file.
- The paths `/api/v1/*` used before July 2026 redirect to `/date/v1/*`; use `/date/v1/` in new code.
- Some descriptions in `index.json` still carry counts from its last update (`updated` field); the files themselves are current.
- The manifest declares `Access-Control-Allow-Origin: *`, but on 2026-10-18 the header was not returned, so browser calls from another origin may fail. Server-side fetches are unaffected.

## Tutorial seeds (for content pipeline)

- "Loss-making state companies by county, from one JSON file"
- "Joining management pay to company results by CUI"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] MCP tool (`ro_soe_profile` by CUI)

## References

- Documentation: https://companiidestat.ro/date/
- Manifest: https://companiidestat.ro/date/v1/index.json
- Methodology: https://companiidestat.ro/metodologie/
- Last manual verification: 2026-10-18
