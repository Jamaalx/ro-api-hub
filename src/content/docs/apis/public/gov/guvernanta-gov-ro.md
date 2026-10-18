---
slug: guvernanta-gov-ro
title: guvernanta.gov.ro: State-Owned Company Governance Registry
category: gov
institution: Guvernul României
country: RO
status: active
verified_at: 2026-10-18
auth: none
protocol: static_files
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: none_documented
official_docs: https://guvernanta.gov.ro/
api_base_url: https://guvernanta.gov.ro/data/registry.json
last_known_version: "schema 2.0"
mandatory_for_business: false
---

# guvernanta.gov.ro: State-Owned Company Governance Registry

## Overview

Government portal launched in September 2026 that publishes, for central state-owned companies (întreprinderi publice centrale), who sits on the board and in executive management, their monthly gross pay, mandate end dates and declared political affiliation, plus the underlying PDFs (CVs, mandate contracts, annual remuneration reports). The legal basis cited on the site is OUG 109/2011 on corporate governance of public enterprises, chapter V, art. 51 (transparency obligations).

The whole dataset behind the site is one static JSON file, downloadable without a key or captcha. Coverage is central companies only (121 in the 2026-09-25 snapshot); companies owned by county and city councils are not included.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://guvernanta.gov.ro/data/registry.json` | Full registry: institutions, people, appointments, document index (~1.9 MB) |
| GET | `https://guvernanta.gov.ro/top_companii.json` | Financials for 1,154 state-owned companies: supervising authority, CUI, turnover, net result (current and previous year), equity |
| GET | `https://guvernanta.gov.ro/CUI_Documente_Companii_Stat/{cui}/{file}.pdf` | Documents per company, paths taken from `registry.json` (`cv.local_url`, `assets.*[].url`) |

## Authentication

None. Static files served by nginx, with `ETag` and `Last-Modified` headers, so conditional requests work.

## Request example

```bash
curl -s https://guvernanta.gov.ro/data/registry.json -o registry.json

# appointments per role category
jq '[.appointments[].role.category] | group_by(.) | map({(.[0]): length}) | add' registry.json
```

## Response example

Top level (tested 2026-10-18, `generated_at` 2026-09-25, `published_at` 2026-10-02):

```json
{
  "schema_version": "2.0",
  "generated_at": "2026-09-25T13:49:57.422836Z",
  "published_at": "2026-10-02T07:48:24+00:00",
  "locale": "ro-RO",
  "currency": "RON",
  "institutions": [ "... 121 items" ],
  "people": [ "... 586 items" ],
  "appointments": [ "... 697 items" ],
  "cv_matching": { "method": "CUI folder + normalized person-name tokens" },
  "company_assets": { "summary": { "source_companies": 121, "cv_files": 640, "contract_files": 476, "annual_remuneration_reports": 92 } }
}
```

One institution:

```json
{
  "id": "inst_cui-31029694_fbc8ca0d0e",
  "name": "Active Conexe SA",
  "cui": "31029694",
  "supervising_authority": "Autoritatea pentru Administrarea Activelor Statului",
  "authority_level": "central",
  "website_url": "https://www.activeconexe.ro",
  "metrics": { "members": 6, "local_cvs": 6, "public_cvs": 0, "compensation_records": 6 },
  "assets": {
    "folder_url": "CUI_Documente_Companii_Stat/31029694",
    "annual_remuneration_reports": [ { "name": "RAR_....pdf", "url": "CUI_Documente_Companii_Stat/31029694/..." } ],
    "cv_files": [ "..." ],
    "contract_files": []
  }
}
```

One appointment (person fields shortened):

```json
{
  "id": "appt_...",
  "institution_id": "inst_cui-10874881_...",
  "person_id": "person_...",
  "role": { "label": "Președintele Consiliului de Administrație", "category": "board_chair" },
  "cv": { "local_url": "CUI_Documente_Companii_Stat/10874881/CV_....pdf", "match": { "method": "cui_folder_filename", "confidence": "high" } },
  "political_affiliation": null,
  "compensation": { "gross_ron": 17926, "net_ron": null, "period": null },
  "mandate_end_date": "2027-02-27",
  "mandate_contracts": []
}
```

`role.category` values seen: `board_member`, `executive_director`, `board_chair`, `director`, `other`.

## Existing SDKs / wrappers

None known.

## Testing approach

- [x] Direct HTTP test (curl / fetch), plain GET of a static file
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- **Snapshot, not live.** `generated_at` / `published_at` tell you how old it is. Appointments made after the snapshot are missing, and directors employed under an ordinary labour contract (not a mandate contract) are generally not listed.
- **Join key is the CUI**, a string in `institutions[].cui`; appointments point to institutions and people by internal `id`.
- **Pay is monthly gross in lei** (`compensation.gross_ron`); net and EUR fields are mostly null. Some amounts differ from the AMEPIP nominal pay report of August 2025 and from the companies' own AGM decisions, so verify against the source document before quoting a single figure.
- **Political affiliation is self-declared to the Government.** Null or "neafiliat" here does not rule out a party listed in the person's ANI declaration of interests.
- **Document paths are relative** to `https://guvernanta.gov.ro/`. Some CVs are published in redacted form (`*_Redacted.pdf`).
- `top_companii.json` is an array of arrays: the first row is the header (`"Row Selection"`, `"Autoritate tutelara"`, `"CUI"`, `"Companie"`, `"Cifra de afaceri (anul curent)"`, `"Rezultat NET"`, `"Rezultat NET (an anterior)"`, `"Capitaluri proprii"`). It sits at the site root, not under `/data/`. Its figures match the MFin 2025 open data, so it adds the supervising authority, not new financials.
- The "Descarcă CSV" button on the site builds the CSV in the browser from `registry.json`; there is no CSV file on the server.
- The registry contains personal data published under a legal transparency obligation. Reusing it for profiling individuals has GDPR implications; aggregate where you can.

## Tutorial seeds (for content pipeline)

- "Who runs Romania's central state-owned companies: loading registry.json into DuckDB"
- "Mandates expiring in the next six months, by supervising ministry"
- "Joining board pay to company financials by CUI"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] JSON Schema for `registry.json` schema 2.0
- [ ] Change feed: diff successive snapshots (new and ended appointments)
- [ ] MCP tool exposed via FastMCP (`ro_soe_board_lookup` by CUI)
- [ ] Code samples (Node/Python)

## References

- Portal: https://guvernanta.gov.ro/
- Data file: https://guvernanta.gov.ro/data/registry.json
- OUG 109/2011 privind guvernanța corporativă a întreprinderilor publice, chapter V, art. 51
- Used by companiidestat.ro, which joins it with financial statements and AMEPIP data for all state-owned companies, central and local
- Last manual verification: 2026-10-18
