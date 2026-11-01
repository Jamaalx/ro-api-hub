---
slug: anaf-bilant
title: ANAF Annual Financial Statements Web Service (bilanț)
category: fiscal
institution: ANAF (Agenția Națională de Administrare Fiscală)
country: RO
status: active
verified_at: 2026-10-18
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: none_documented
official_docs: https://static.anaf.ro/static/10/Anaf/Informatii_R/doc_WS_Bilant_V1.txt
api_base_url: https://webservicesp.anaf.ro/bilant
last_known_version: "v1"
mandatory_for_business: false
---

# ANAF Annual Financial Statements Web Service (bilanț)

## Overview

Public, keyless web service published by ANAF that returns the public indicators from a company's annual financial statements (situații financiare / raportări contabile anuale) for one CUI and one year. The standard form returns 20 indicators: fixed and current assets, debts, equity, net turnover, total revenue and expenses, gross and net profit or loss, and the average number of employees. Listed on ANAF's synchronous web services page as service no. 2 ("Serviciu web pentru obţinerea informaţiilor publice din situaţiile financiare"), documentation published 2021-01-20.

It is the per-CUI counterpart of the bulk "Situații financiare" files on data.gov.ro. The bulk files do not contain every filed statement. In our use, the per-CUI service returned statements that were missing from the bulk files for the same year (for example several state-owned companies such as TAROM, CFR SA and Poșta Română).

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://webservicesp.anaf.ro/bilant?an={year}&cui={cui}` | Public indicators of the annual financial statements of one CUI for one year |

## Authentication

None. Public, anonymous endpoint. No API key, no captcha, no User-Agent requirement.

## Request example

```bash
curl 'https://webservicesp.anaf.ro/bilant?an=2025&cui=13267213'
```

## Response example

Abridged response for Hidroelectrica, 2025 (tested 2026-10-18):

```json
{
  "an": 2025,
  "cui": 13267213,
  "deni": "SPEEH HIDROELECTRICA SA",
  "caen": 3511,
  "den_caen": "Producţia de energie electrică din resurse neregenerabile",
  "i": [
    { "indicator": "I1",  "val_indicator": 20065052100, "val_den_indicator": "ACTIVE IMOBILIZATE - TOTAL " },
    { "indicator": "I7",  "val_indicator": 3091384669,  "val_den_indicator": "DATORII " },
    { "indicator": "I10", "val_indicator": 22110557156, "val_den_indicator": "CAPITALURI - TOTAL, din care:" },
    { "indicator": "I13", "val_indicator": 9758404582,  "val_den_indicator": "Cifra de afaceri neta" },
    { "indicator": "I14", "val_indicator": 10109194020, "val_den_indicator": "VENITURI TOTALE" },
    { "indicator": "I18", "val_indicator": 3337517121,  "val_den_indicator": "Profit net" },
    { "indicator": "I20", "val_indicator": 3554,        "val_den_indicator": "Numar mediu de salariati" }
  ]
}
```

Standard form (commercial companies), as returned in 2026:

| Code | Label |
|------|-------|
| I1 | Active imobilizate - total |
| I2 | Active circulante - total |
| I3 | Stocuri |
| I4 | Creanțe |
| I5 | Casa și conturi la bănci |
| I6 | Cheltuieli în avans |
| I7 | Datorii |
| I8 | Venituri în avans |
| I9 | Provizioane |
| I10 | Capitaluri - total |
| I11 | Capital subscris vărsat |
| I12 | Patrimoniul regiei |
| I13 | Cifra de afaceri netă |
| I14 | Venituri totale |
| I15 | Cheltuieli totale |
| I16 | Profit brut |
| I17 | Pierdere brută |
| I18 | Profit net |
| I19 | Pierdere netă |
| I20 | Număr mediu de salariați |

When nothing is found (unknown CUI, year without data) the service still answers HTTP 200:

```json
{ "an": 2025, "cui": 1, "deni": "", "caen": 0, "den_caen": "", "i": [] }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| REST proxy | `demoanaf.ro` | active 2026 | Exposes it as `/api/balance/{CUI}/{YEAR}` with a cache, see [demoanaf-ro](/demoanaf-ro/) |

## Testing approach

- [x] Direct HTTP test (curl / fetch), no UA spoof, plain GET
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- **Indicator codes are reused across forms.** Banks, insurers and other financial institutions file different forms, and the same codes I1..I20+ carry different meanings. A bank statement (tested on CEC Bank, 2024) returns 23 indicators where I17 is "Profit sau (-) pierdere aferent(a) exercitiului". Mapping by code alone gives wrong figures. Check `val_den_indicator` (for the standard form, I13 starts with "Cifra de afaceri" and I20 with "Numar mediu de salariati") before reading values by code.
- **Labels are not stable.** The same code can carry slightly different labels across filings (I19 came back as "Pierdere bruta" for one company and "Pierdere neta" for another in the same year). Labels also carry trailing spaces and mixed cedilla/comma diacritics. Normalize before comparing.
- **Losses are positive numbers** in their own fields (I17, I19); profit fields are 0 in a loss year. Net result = I18 − I19.
- **Array order is not guaranteed.** One 2025 response started with I5. Index by `indicator`, not by position.
- **Empty is HTTP 200.** Check `i.length` / `deni`, not the status code.
- **Years covered differ from the documentation.** The documentation says 2014–2019. In tests on 2026-10-18, 2019–2025 returned data, while 2010–2018 returned an empty `i` for every CUI tried (including companies that certainly filed in those years). The current year (2026) is empty until filings are processed.
- **Values are in lei**, integers, except I20 (headcount).
- No published rate limit. We fetched about 6,000 statements with a 0.3 s pause between requests without being throttled; responses take ~0.1–1.5 s. Be polite anyway.
- Public-institution budget execution reports and IFRS consolidated statements are not covered; this is the individual annual statement as filed with ANAF/MFin.

## Tutorial seeds (for content pipeline)

- "Turnover, profit and headcount for a CUI in one GET request"
- "Telling a bank statement from a standard one before you parse it"
- "Filling the gaps in data.gov.ro bulk financial statements with per-CUI lookups"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (none official)
- [ ] Thin REST wrapper that maps I1..I20 to named fields per form type
- [ ] MCP tool exposed via FastMCP (`anaf_financial_statements`)
- [ ] Code samples (Node/Python/PHP/Go)

## References

- Official docs: https://static.anaf.ro/static/10/Anaf/Informatii_R/doc_WS_Bilant_V1.txt
- ANAF synchronous web services index: https://static.anaf.ro/static/10/Anaf/Informatii_R/Servicii_web/servicii_sincron.html
- Bulk equivalent on data.gov.ro: https://data.gov.ro/dataset/situatii_financiare_2024
- Used in production by companiidestat.ro to complete the balance sheets of state-owned companies
- Last manual verification: 2026-10-18
