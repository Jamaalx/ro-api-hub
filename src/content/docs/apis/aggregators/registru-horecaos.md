---
slug: registru-horecaos
title: registru.horecaos.org — Free Romanian Company Registry API
category: aggregator
institution: HoReCaOS (registru.horecaos.org)
country: RO
status: active
links_checked_at: 2026-09-24
auth: api_key
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: "1,000 requests / day per key"
official_docs: https://registru.horecaos.org/api
api_base_url: https://registru.horecaos.org/api/v1/
last_known_version: "v1"
mandatory_for_business: false
---

# registru.horecaos.org

## Overview

Free public register of Romanian companies built from ONRC open data (refreshed monthly) and ANAF data (refreshed periodically). Besides the website (search, list checks, new companies, maps, statistics), it exposes a small REST/JSON API for looking up a company by CUI or searching by name — aimed at invoicing, customer onboarding and form auto-fill. A free key allows 1,000 requests per day. No personal names are returned. The data is informative and has no value as an official document (for an official extract use ONRC's `myportal.onrc.ro`).

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `https://registru.horecaos.org/api/v1/cheie` | Request a free API key (form field `email`); also available as a form on the `/api` page |
| GET | `https://registru.horecaos.org/api/v1/firma/{CUI}` | Company record by CUI |
| GET | `https://registru.horecaos.org/api/v1/cauta?q={text}` | Search companies by name |
| GET | `https://registru.horecaos.org/widget.js` | Drop-in script that auto-fills form fields from a CUI |
| GET | `https://registru.horecaos.org/badge/{CUI}.svg` | "Verified in the company register" badge (no key needed) |

Fields returned (per the `/api` page): identification (name, CUI, trade-register number, EUID, legal form, registration date), contact (address, county, locality, postal code, phone, web), fiscal (VAT payer, inactive, VAT on collection, split VAT, RO e-Factura register, IBAN, tax office), activity (main CAEN + all authorised codes) and financials by year (turnover, net profit, employees).

## Authentication

1. Get a key from the form on https://registru.horecaos.org/api (email + optional purpose), or from the terminal with `POST /api/v1/cheie` and `email=...`. The key is shown on screen and sent by email.
2. Send it as the `x-api-key` header, or as the `?key=` query parameter (the widget uses the query parameter).

Without a key the API answers `401` with a JSON error.

## Request example

```bash
curl -H "x-api-key: YOUR_KEY" https://registru.horecaos.org/api/v1/firma/14399840
curl -H "x-api-key: YOUR_KEY" "https://registru.horecaos.org/api/v1/cauta?q=placinta"
```

Widget:

```html
<script src="https://registru.horecaos.org/widget.js" data-key="YOUR_KEY"></script>
<input data-registru="cui" placeholder="CUI">
<input data-registru="denumire">
<input data-registru="adresa">
<input data-registru="nr_reg_com">
```

The widget calls `/api/v1/firma/{CUI}` when the `cui` field changes, fills any element with a matching `data-registru` attribute (`denumire_fiscala`, `nr_reg_com`, `adresa`, `judet`, `localitate`, `cod_postal`, `telefon`, `iban`, `caen`, `forma_juridica`, `denumire`) and dispatches `registru:firma` (full response in `detail`) or `registru:eroare`.

## Response example

Full success payload: unknown (not tested with a key). The field names used by `widget.js` are listed above. Observed error without a key:

```json
{"error":"lipsește cheia (header x-api-key sau ?key=)"}
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| JS (browser) | `https://registru.horecaos.org/widget.js` | active 2026 | Official form auto-fill widget |

## Testing approach

- [x] Direct HTTP test (curl / fetch) — needs a free key
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- Data is informative only — not an official extract (use ONRC for that).
- ONRC data is refreshed monthly, so very recent registrations and changes may lag behind ANAF.
- No personal names (shareholders/administrators) by design.
- CORS is open (`access-control-allow-origin: *`), which is what lets the widget run in the browser — but a key embedded in a page is visible to every visitor; restrict usage accordingly.
- Rate limit: 1,000 requests per day per key; behaviour when exceeded is not documented.
- No OpenAPI spec published.

## Tutorial seeds (for content pipeline)

- "Auto-fill a Romanian invoice form from the CUI with widget.js"
- "Free CUI lookup: registru.horecaos.org vs ANAF v9 vs openapi.ro"

## ro-api-hub integration plan

- [x] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (if missing officially)
- [ ] Code samples (Node/Python/PHP/Go)

## References

- API page: https://registru.horecaos.org/api
- Data sources: https://registru.horecaos.org/surse
- Widget source: https://registru.horecaos.org/widget.js
- Page read on 2026-09-24 (GET only; API not exercised with a key)
