---
slug: bnr-fx-today
title: BNR Daily FX Rates (Today XML)
category: finance
institution: Banca Națională a României
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: none
protocol: REST/XML
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: "none_documented — be polite, cache aggressively (rates change once/day ~13:00)"
official_docs: https://www.bnr.ro/Cursurile-pietei-valutare-in-format-XML-3424-Mobile.aspx
api_base_url: https://www.bnr.ro/nbrfxrates.xml
last_known_version: "current"
mandatory_for_business: false
---

# BNR Daily FX Rates — Today

## Overview

Static XML file published daily by the Romanian National Bank with the official RON exchange rates against the major currencies. Updated every working day around 13:00 EET. This is the canonical source for accounting / invoicing in Romania (`Code fiscal` requires BNR rates for FX conversion).

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://www.bnr.ro/nbrfxrates.xml` | Latest daily rates |

## Authentication

None.

## Request example

```bash
curl 'https://www.bnr.ro/nbrfxrates.xml'
```

## Response example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<DataSet xmlns="http://www.bnr.ro/xsd">
  <Header>
    <Publisher>National Bank of Romania</Publisher>
    <PublishingDate>2026-05-26</PublishingDate>
    <MessageType>DR</MessageType>
  </Header>
  <Body>
    <Subject>Reference rates</Subject>
    <OrigCurrency>RON</OrigCurrency>
    <Cube date="2026-05-26">
      <Rate currency="AED">1.3531</Rate>
      <Rate currency="AUD">3.2189</Rate>
      <Rate currency="EUR">4.9774</Rate>
      <Rate currency="USD">4.6258</Rate>
      <!-- ... ~40 currencies ... -->
    </Cube>
  </Body>
</DataSet>
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| PHP / Lumen | `gibex/currency-bnr-lumen` | active | Lumen package |
| PHP | `butchero/cursbnr` | active | Simple wrapper |
| PHP | `sebastiancostiug/curs-valutar-bnr-rest-api` | active | REST API package |
| Multi | `openapi.ro/exchange` | active 2026 | Free aggregator (BNR + others) |

## Testing approach

- [x] Direct HTTP test (curl/fetch) — no UA spoof needed
- [x] Cache the XML for ≥1 hour; rates change once a day
- [x] On weekends/holidays the file keeps the last working day's date — handle gracefully

## Known issues / gotchas

- Rates published ~13:00 EET — services that boot earlier get yesterday's rates
- Some less-traded currencies use `multiplier="100"` attribute (e.g. JPY, HUF, KRW) — multiply accordingly
- All rates are RON per 1 unit of foreign currency (except multiplier=100 cases)
- File is ~3 KB; cached at CDN — extremely cheap
- Date attribute is in EET, not UTC — be careful with timezone math

## Tutorial seeds (for content pipeline)

- "Convert any currency to RON using BNR rates in 5 lines (Node/Python/PHP)"
- "Handling the multiplier=100 trap with JPY / HUF / KRW"
- "Building a tiny BNR proxy with Cloudflare Workers + KV cache"
- "Why your invoice's FX rate doesn't match accountant's — BNR publication time"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] OpenAPI 3.1 spec wrapping the XML as JSON
- [ ] REST wrapper: `GET /v1/fx/today`, `GET /v1/fx/today/{base}/{quote}`
- [ ] MCP tool: `bnr_fx_today`
- [ ] Cloudflare Worker reference implementation with KV caching

## References

- Landing page: https://www.bnr.ro/Cursurile-pietei-valutare-in-format-XML-3424-Mobile.aspx
- Last manual verification: 2026-05-27 (rates dated 2026-05-26)
