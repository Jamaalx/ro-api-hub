---
slug: monitorul-oficial
title: Monitorul Oficial — e-monitor
category: justice
institution: Regia Autonomă Monitorul Oficial (RAMO)
country: RO
status: active
verified_at: 2026-10-18
links_checked_at: 2026-09-24
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: freemium
rate_limit: none_documented
official_docs: https://monitoruloficial.ro/e-monitor/
api_base_url: https://monitoruloficial.ro/ramo_customs/
last_known_version: "n/a"
mandatory_for_business: false
---

# Monitorul Oficial — e-monitor

## Overview

Monitorul Oficial al României is the gazette of record for all Romanian laws, ordinances, and official acts. Part IV (Partea a IV-a) carries company acts: board and shareholder decisions, appointments of directors, capital changes, mergers.

Access is split in two:

- **Free, no account.** The e-monitor page offers a search by CUI over Part IV, a list of the issues published on a given day, and the full PDF of each issue for **10 days after publication**. The PDFs have a text layer (no OCR needed). These calls go to undocumented JSON/HTML endpoints under `/ramo_customs/` that the e-monitor page itself uses.
- **Paid.** Older issues (the archive) need a subscription, priced per page (~2 lei/pagină).

There is no documented public API. Consolidated legislation lives at legislatie.just.ro under separate terms.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://monitoruloficial.ro/e-monitor/` | Page that embeds `var ramoApi = {url_cui, nonce_cui, url_anunturi, nonce_anunturi}` |
| POST | `https://monitoruloficial.ro/ramo_customs/api/cui.php` | Part IV publications for one CUI: registration no., issue no., issue date (no text) |
| POST | `https://monitoruloficial.ro/ramo_customs/emonitor/get_mo.php` | Issues published on one day, all parts (HTML fragment) |
| GET | `https://monitoruloficial.ro/ramo_customs/emonitor/showmo/services/view.php?doc=05{year}{nr}&format=pdf&subfolder=5/{year}/` | Full PDF of a Part IV issue, free for 10 days |
| GET | `https://monitoruloficial.ro/e-monitor/` | Subscription portal (archive) |

## Authentication

None for the free part. The calls need what the browser sends from the e-monitor page:

- a session cookie and the `nonce_cui` value, both from a GET of `/e-monitor/`;
- `Origin: https://monitoruloficial.ro` and/or `Referer: https://monitoruloficial.ro/e-monitor/`;
- `X-Requested-With: XMLHttpRequest` on the POST endpoints.

Paid archive: subscriber account.

## Request example

```bash
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36'
H=(-A "$UA" -b jar -c jar -H 'Origin: https://monitoruloficial.ro' -e 'https://monitoruloficial.ro/e-monitor/')

# 1. session cookie + nonce
NONCE=$(curl -s "${H[@]}" https://monitoruloficial.ro/e-monitor/ | grep -oE '"nonce_cui":"[^"]+"' | cut -d'"' -f4)

# 2. Part IV publications for a CUI
curl -s "${H[@]}" -X POST https://monitoruloficial.ro/ramo_customs/api/cui.php \
  -H 'Content-Type: application/json' -H "X-WP-Nonce: $NONCE" -H 'X-Requested-With: XMLHttpRequest' \
  -d '{"cui":"477647","nr":null}'

# 3. issues published on a day
curl -s "${H[@]}" -X POST https://monitoruloficial.ro/ramo_customs/emonitor/get_mo.php \
  -H 'X-Requested-With: XMLHttpRequest' --data 'today=2026-10-15'

# 4. PDF of Part IV no. 7800/2026 (only within 10 days of publication)
curl -s "${H[@]}" -o mo4-7800-2026.pdf \
  'https://monitoruloficial.ro/ramo_customs/emonitor/showmo/services/view.php?doc=0520267800&format=pdf&subfolder=5/2026/'
```

## Response example

`cui.php` (tested 2026-10-18, abridged):

```json
{
  "data": [
    { "NR_INR_MO": "9639768", "CUI": "477647", "NR_MO": "6799", "DATA_MO": "18 Septembrie 2026" },
    { "NR_INR_MO": "9606843", "CUI": "477647", "NR_MO": "7100", "DATA_MO": "29 Septembrie 2026" },
    { "NR_INR_MO": "9606844", "CUI": "477647", "NR_MO": null,   "DATA_MO": null }
  ]
}
```

`get_mo.php` returns HTML: one card per part, with links such as `/Monitorul-Oficial--PIV--7800--2026.html` and a count (`[ 74 ]` Part IV issues on 2026-10-15).

`view.php` returns `application/pdf` (~150 KB per Part IV issue).

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | — | — | None official; some legal-tech firms scrape under contract |

## Testing approach

- [x] Direct HTTP test (curl / fetch), with cookie, nonce and Origin/Referer
- [ ] Playwright needed for the free endpoints
- [x] Browser UA needed: the default curl User-Agent gets a 403 page on `/e-monitor/`
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- **The 10-day window is strict.** Inside it `view.php` returns the PDF. Outside it, the same URL returns HTTP 200 with an HTML page, not a 4xx, so check `Content-Type`. Tested 2026-10-18: no. 7800 (15 Oct) and 7500 → PDF; no. 7061 (28 Sep) → HTML.
- **Without the Referer, `view.php` redirects (302) to the home page**; the issue pages `/Monitorul-Oficial--PIV--{nr}--{year}.html` do the same.
- **Errors from `cui.php` are JSON with HTTP 403**: `{"error":"Origine invalidă."}` without `Origin`, `{"error":"Sesiune invalidă sau expirată. Reîncarcă pagina."}` without a valid nonce/cookie.
- `cui.php` results are **not sorted by date**. Entries with `NR_MO: null` are registered with the gazette but not yet published.
- `cui.php` gives only the issue number and date, not the text; one issue holds acts for many companies, so you read the PDF to find yours.
- `doc` is `05` (Part IV) + year + issue number; `subfolder` is `5/{year}/`.
- **Part IV PDFs contain personal data in clear** (CNP, home addresses, ID card series of directors and shareholders). Strip them before storing anything.
- To keep a history you have to collect daily; once the window closes, the issue is behind the paywall.
- Terms of service restrict redistribution of the paid content.
- Consolidated text often lives at legislatie.just.ro (different terms).

## Tutorial seeds (for content pipeline)

- "Daily job: new Part IV publications for a list of CUIs before the 10-day window closes"
- "Cum urmărești noile acte normative publicate în Monitor — flux corect"
- "Diferența între Monitorul Oficial și legislatie.just.ro: ce să citezi"

## ro-api-hub integration plan

- [ ] Catalogue entry noting the free 10-day window, the paywall and ToS limits
- [ ] No wrapper for paid content (would conflict with ToS)
- [ ] Link to legislatie.just.ro for free consolidated text

## References

- Portal: https://monitoruloficial.ro/e-monitor/
- Consolidated legislation: https://legislatie.just.ro/
- Last manual verification: 2026-10-18 (free endpoints tested with CUI 477647 and Part IV issues 7061, 7500, 7800 of 2026)
