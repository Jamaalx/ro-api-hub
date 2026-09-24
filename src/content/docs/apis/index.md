---
title: Catalog complet (master index)
description: 125 servicii API românești în 27 de categorii — status, autentificare, endpoint-uri și linkuri către fișa fiecăruia.
sidebar:
  order: 0
---

> 125 per-service MDs across 27 categories. One file per API/service. All use the YAML frontmatter schema in `../templates/api-service.md` — parsable by downstream agents (Playwright probes, OpenAPI generators, MCP wrappers, tutorial pipelines).

**Verified at:** 2026-05-27

## Legend
- ✅ active + current
- ⚠️ stale but reachable
- 🔒 gated (contract / login / cert / WAF / paywall)
- ❌ broken / non-existent (no public API)
- 🚨 critical (suspended / archived / 404)
- ⭐ strategically important (competitor, template, MCP-ready)

---

## PUBLIC SECTOR (67)

### Fiscal (10) — `apis/public/fiscal/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [anaf-vat-v9](/anaf-vat-v9/) | Current ANAF VAT/CUI verification |
| ⚠️ | [anaf-vat-v8-async](/anaf-vat-v8-async/) | v8 retired 2025-05-01 — migrate to v9 |
| ✅ | [anaf-efactura-prod](/anaf-efactura-prod/) | Mandatory B2B; OAuth2 + qualified cert |
| ✅ | [anaf-efactura-test](/anaf-efactura-test/) | Sandbox |
| ✅ | [anaf-etransport](/anaf-etransport/) | Mandatory; 2025 guide moved to `/AsistentaContribuabili_r/` (2026-09-24) |
| ✅ | [anaf-oauth2](/anaf-oauth2/) | Token service for all ANAF APIs |
| ✅ | [anaf-spv](/anaf-spv/) | Mailbox: messages between taxpayer and ANAF |
| ✅ | [anaf-saf-t](/anaf-saf-t/) | Schema v249, last update 2026-02-19 |
| ✅ | [anaf-etva](/anaf-etva/) | Pre-filled VAT returns (new) |
| 🔒 | [anaf-cazier-fiscal](/anaf-cazier-fiscal/) | Inter-institutional only |

### Finance (8) — `apis/public/finance/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [bnr-fx-today](/bnr-fx-today/) | Daily XML, 46 currencies |
| ✅ | [bnr-fx-10days](/bnr-fx-10days/) | |
| ✅ | [bnr-fx-yearly](/bnr-fx-yearly/) | Yearly history per year |
| ⚠️ | [bnr-interactive-db](/bnr-interactive-db/) | Host fix: bnro.ro → bnr.ro |
| ⚠️ | [bnr-robor](/bnr-robor/) | Scrape-only, WAF on PDF |
| 🚨 | [asf-registers](/asf-registers/) | **/en/a/1544/ returns 404** — needs new URL |
| 🔒 | [bvb-arena-datafeed](/bvb-arena-datafeed/) | Paywall (contract) |
| 🔒 | [bvb-arenaxt](/bvb-arenaxt/) | Paywall; protocol PDF v3.1.3 (2019) |

### Registry (2) — `apis/public/registry/`
| Status | File | Notes |
|--------|------|-------|
| 🔒 | [onrc-recom](/onrc-recom/) | Paid bulk access; portal moved to myportal.onrc.ro |
| ⚠️ | [onrc-opendata](/onrc-opendata/) | Datasets stale on data.gov.ro |

### Statistics (2) — `apis/public/stats/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [insse-tempo](/insse-tempo/) | TEMPO-Online; community dump `gov2-ro/tempo-ins-dump` very active |
| 🔒 | [insse-esop](/insse-esop/) | Login required |

### Geo (9) — `apis/public/geo/`
| Status | File | Notes |
|--------|------|-------|
| 🚨 | [ancpi-geoportal](/ancpi-geoportal/) | Offline since the July 2026 ANCPI ransomware attack; staged restart pending |
| ✅ | [ancpi-inspire-wfs](/ancpi-inspire-wfs/) | OGC WFS 2.0 cadastral parcels |
| ⚠️ | [ancpi-eterra](/ancpi-eterra/) | 301 → MyEterra |
| 🚨 | [ancpi-myeterra](/ancpi-myeterra/) | Notary/pro access — offline since the July 2026 ransomware attack |
| ✅ | [anm-weather-xml](/anm-weather-xml/) | 5 XML feeds documented; reuse needs contract |
| ✅ | [anm-inspire](/anm-inspire/) | WMS 1.3 + WFS, INSPIRE conformant |
| ⚠️ | [anar-gis-portal](/anar-gis-portal/) | TLS cert mismatch |
| ✅ | [inhga-hydrology](/inhga-hydrology/) | Active 2026-04-23 |
| ✅ | [geo-spatial-org](/geo-spatial-org/) | OSGeo-RO chapter; active 2026-01-22 |

### Health (4) — `apis/public/health/`
| Status | File | Notes |
|--------|------|-------|
| 🔒 | [cnas-pias-siui](/cnas-pias-siui/) | SOAP WSDL; WAF 403 + cert; mandatory for providers |
| 🔒 | [cnas-sipe](/cnas-sipe/) | E-prescriptions, same gating |
| ✅ | [cnas-ecard](/cnas-ecard/) | Windows DLL SDK (not HTTP) |
| ✅ | [cnas-asigurat-status](/cnas-asigurat-status/) | CNP+name web form (no API) |

### Transport (6) — `apis/public/transport/`
| Status | File | Notes |
|--------|------|-------|
| ❌ | [cnair-rovinieta](/cnair-rovinieta/) | Just redirects to erovinieta |
| 🔒 | [erovinieta](/erovinieta/) | Distributor contract; WAF 403 |
| 🚨 | [rar-auto-pass](/rar-auto-pass/) | **SUSPENDED** ("aplicația Istoric Vehicul este suspendat") |
| ✅ | [drpciv](/drpciv/) | JS-rendered, needs Playwright |
| ✅ | [cfr-mersultrenurilor](/cfr-mersultrenurilor/) | Internal JSON, undocumented; 1900+ trains |
| ✅ | [arr](/arr/) | Active 2026, sub-apps testare/licente/etc |

### Justice (2) — `apis/public/justice/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [portal-just-ecris](/portal-just-ecris/) | SOAP at portalquery.just.ro |
| ✅ | [monitorul-oficial](/monitorul-oficial/) | 2 lei/pagină |

### Identity (3) — `apis/public/identity/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [roeid](/roeid/) | National SSO; OIDC + SAML 2.0; eIDAS-notified |
| ✅ | [sts-ca](/sts-ca/) | Qualified certs CA |
| 🔒 | [depabd](/depabd/) | Inter-institutional only |

### Gov (3) — `apis/public/gov/`
| Status | File | Notes |
|--------|------|-------|
| 🔒 | [ghiseul-snep](/ghiseul-snep/) | Institution enrollment; 8.5M tx/2024 |
| 🚨 | [e-guvernare](/e-guvernare/) | Replaced by ROePAS (roepas.ro, March 2026) |
| ✅ | [catalog-servicii-publice](/catalog-servicii-publice/) | 2900+ services |

### Open Data (2) — `apis/public/opendata/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [data-gov-ro-ckan](/data-gov-ro-ckan/) | CKAN API verified, 2000+ packages |
| ⚠️ | [govro-github](/govro-github/) | Last activity 2017 |

### Procurement (2) — `apis/public/procurement/`
| Status | File | Notes |
|--------|------|-------|
| ⚠️ | [seap-sicap](/seap-sicap/) | JS-rendered |
| ⚠️ | [ocds-ro0046](/ocds-ro0046/) | OCDS pilot |

### Elections (1) — `apis/public/elections/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [aep-prezenta](/aep-prezenta/) | Static JSON dumps per cycle |

### Regulators / civic (7) — `apis/public/regulators/`
| Status | File | Notes |
|--------|------|-------|
| ⚠️ | [anre](/anre/) | TLS cert error; no API |
| ⚠️ | [ancom-netograf](/ancom-netograf/) | JS-rendered; no public API |
| ✅ | [anspdcp](/anspdcp/) | Active 2026 |
| ✅ | [posta-romana-track](/posta-romana-track/) | B2B contract for bulk |
| 🚨 | [code4ro-civichq](/code4ro-civichq/) | API host gone; continues as Centru Civic (no public API) |
| 🚨 | [code4ro-monitorizare-vot](/code4ro-monitorizare-vot/) | **ARCHIVED 2025-05-26** |
| ✅ | [peviitor-orase](/peviitor-orase/) | NGO, very active |

---

## PRIVATE SECTOR (50)

### Banks PSD2 (10) — `apis/private/banks/`
All: ✅ active sandbox, contract for prod, OAuth2 + eIDAS QWAC, Berlin Group spec.
> Finqware benchmark: 3 of 16 RO PSD2 APIs broken in prod.

| File | Notes |
|------|-------|
| [bcr-erste-psd2](/bcr-erste-psd2/) | 8+ APIs |
| [bt-psd2](/bt-psd2/) | Largest RO bank |
| [brd-psd2](/brd-psd2/) | Retail + corporate |
| [ing-ro-psd2](/ing-ro-psd2/) | Best docs |
| [raiffeisen-ro-psd2](/raiffeisen-ro-psd2/) | Only RO w/ PIISP at launch — developer portal host gone (2026-09-24) |
| [cec-bank-psd2](/cec-bank-psd2/) | State-owned |
| [otp-ro-psd2](/otp-ro-psd2/) | Bank absorbed by BT on 2025-02-28 — use bt-psd2 |
| [alpha-bank-ro-psd2](/alpha-bank-ro-psd2/) | Bank absorbed by UniCredit (Aug 2025) — use developer.unicredit.eu |
| [libra-bank-psd2](/libra-bank-psd2/) | + premium API Banking; portal now `/devportal/` |
| [garanti-bbva-ro-psd2](/garanti-bbva-ro-psd2/) | Layer7 portal |

### Payments (6) — `apis/private/payments/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [netopia-mobilpay](/netopia-mobilpay/) | Full official SDKs `github.com/mobilpay` |
| ✅ | [euplatesc](/euplatesc/) | Community wrappers |
| ✅ | [twispay-xmoney](/twispay-xmoney/) | Rebranded |
| ✅ | [plationline](/plationline/) | Docs on request |
| ✅ | [smart2pay-nuvei](/smart2pay-nuvei/) | 200+ APMs |
| ✅ | [stripe-ro](/stripe-ro/) | Klarna 4.99% + 1.50 RON |

### Couriers (6) — `apis/private/couriers/`
All ✅ active (contract for prod).
| File | Notes |
|------|-------|
| [sameday](/sameday/) | + easybox locker SDK |
| [fan-courier](/fan-courier/) | Repo docs on GitHub |
| [cargus](/cargus/) | Azure APIM, new portal urgentcargus.developer.azure-api.net |
| [dpd-ro](/dpd-ro/) | Swagger at api.dpd.ro |
| [gls-ro](/gls-ro/) | Account-only docs |
| [innoship](/innoship/) | Multi-courier aggregator, Swagger live |

### Telecom (4) — `apis/private/telecom/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [orange-ro-camara](/orange-ro-camara/) | CAMARA APIs; 5G Lab sandbox |
| ❌ | [vodafone-ro](/vodafone-ro/) | No public dev portal |
| ❌ | [digi-rcs-rds](/digi-rcs-rds/) | No public dev portal |
| ❌ | [telekom-ro](/telekom-ro/) | **DEFUNCT 2025** |

### Marketplaces (3) — `apis/private/marketplaces/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [emag-marketplace](/emag-marketplace/) | Basic auth, ~3 req/s |
| ✅ | [olx-storia-re](/olx-storia-re/) | OAuth2, Swagger |
| ❌ | [olx-ro-classifieds](/olx-ro-classifieds/) | No public classifieds API |

### SMS (1) — `apis/private/sms/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [smso-ro](/smso-ro/) | 100 free SMS on signup |

### Invoicing (6) — `apis/private/invoicing/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [smartbill-cloud](/smartbill-cloud/) | 3 req/s |
| ✅ | [oblio](/oblio/) | Cheaper alternative |
| 🔒 | [fgo](/fgo/) | Enterprise plan only |
| ✅ | [facturis-online](/facturis-online/) | Docs on request |
| ❌ | [saga-soft](/saga-soft/) | Desktop only, use Oblio/FGO sync |
| ✅ | [nexus-erp](/nexus-erp/) | Per-app key |

### Maps (2) — `apis/private/maps/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [geo-spatial-org-datasets](/geo-spatial-org-datasets/) | CC/Free |
| ✅ | [osm-ro-geofabrik](/osm-ro-geofabrik/) | ODbL |

### Jobs (3) — `apis/private/jobs/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [peviitor-jobs](/peviitor-jobs/) | Open-source NGO; 1661 commits |
| ❌ | [ejobs-ro](/ejobs-ro/) | No public API |
| ❌ | [bestjobs-ro](/bestjobs-ro/) | No public API |

### Energy (3) — `apis/private/energy/`
All ❌ broken (no public API). Tutorials → Playwright/Camoufox scraping.
| File |
|------|
| [ppc-enel](/ppc-enel/) |
| [anre-tariffs](/anre-tariffs/) |
| [hidroelectrica](/hidroelectrica/) |

### Insurance (2) — `apis/private/insurance/`
| Status | File | Notes |
|--------|------|-------|
| 🔒 | [troco-rca](/troco-rca/) | B2B contract |
| 🔒 | [pago-iasigurare](/pago-iasigurare/) | Partner only |

---

## AGGREGATORS (9) — `apis/aggregators/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [openapi-ro](/openapi-ro/) | Free 100 req/mo; CIF/CNP/IBAN |
| 🔒 | [listafirme-eu](/listafirme-eu/) | Credit-based; API now under listafirme.ro/api/ |
| ✅ | [registru-horecaos](/registru-horecaos/) | Free key, 1,000 req/day; CUI lookup + search + form widget |
| 🔒 | [alertacui-ro](/alertacui-ro/) | Subscription monitoring |
| ⭐ | [incorpo-ro-mcp](/incorpo-ro-mcp/) | **MAIN COMPETITOR — first MCP server for RO public data** |
| ✅ | [everifica-ro](/everifica-ro/) | Free UI |
| ⭐ | [demoanaf-ro](/demoanaf-ro/) | Modern REST/JSON, Redis-cached — direct competitor |
| ✅ | [aperta-sync-anaf-simulator](/aperta-sync-anaf-simulator/) | Local dev simulator |
| ✅ | [eranova-datacore](/eranova-datacore/) | REST cache proxy |

## COMMUNITY (9) — `apis/community/`
| Status | File | Notes |
|--------|------|-------|
| ⭐ | [florin-szilagyi-efactura-sdk](/florin-szilagyi-efactura-sdk/) | **Already bundles MCP server** |
| ✅ | [printesoi-efactura-go](/printesoi-efactura-go/) | Go SDK |
| ✅ | [andalisolutions-anaf-php](/andalisolutions-anaf-php/) | PHP 8.2+ |
| ✅ | [itrack-anaf-packagist](/itrack-anaf-packagist/) | Legacy PHP |
| ⚠️ | [mfpanaf-clientspv](/mfpanaf-clientspv/) | Official sample, abandoned |
| ⚠️ | [sibies-just-net](/sibies-just-net/) | Stale 2021 |
| ✅ | [gov2-ro-tempo-dump](/gov2-ro-tempo-dump/) | FastAPI + DuckDB + Parquet |
| ⚠️ | [gov2-ro-prezenta-dump](/gov2-ro-prezenta-dump/) | Stale 2024 |
| ⚠️ | [mihai3332001-oauth2-anaf](/mihai3332001-oauth2-anaf/) | Stale 2023 |

---

## Status totals (125)

From the `status:` frontmatter of the service files (after the 2026-09-24 link check):

| Status | Count |
|--------|-------|
| ✅ active | 86 |
| ⚠️ stale | 11 |
| 🔒 gated | 8 |
| ❌ broken / no public API | 13 |
| 🚨 suspended | 7 (RAR Auto Pass, ANCPI Geoportal, MyEterra, e-guvernare, CivicHQ, OTP RO and Alpha Bank RO PSD2) |

The icons in the tables above are an editorial summary and can differ from the `status:` field; the field is authoritative (also exported in `catalog.json`).

## Quick wins for ro-api-hub (no real competition)

1. **REST facade over CFR Călători timetables** — currently scrape-only undocumented JSON
2. **REST facade over CNAIR rovinietă verification** — no public API
3. **REST facade over DRPCIV** — JS-rendered; needs Playwright
4. **REST facade over ANRE tariff comparator** — no API
5. **REST facade over ANCOM Netograf** — no API
6. **REST facade over OLX RO classifieds** — no API
7. **REST facade over eJobs / BestJobs** — no API
8. **REST facade over PPC/Enel/Distribuție meter data** — no API
9. **OpenAPI 3.1 spec for ANAF VAT v9, e-Factura, e-Transport, SPV** — none official
10. **OpenAPI spec for BNR XML feeds** — would be a 30-min wrap

## Competitive landscape — no direct competitor

There is **no existing comprehensive RO API hub**. Adjacent tools are all single-vertical or off-mission:

| Adjacent tool | What it actually is | Why it's not us |
|---------------|---------------------|-----------------|
| [incorpo.ro](https://www.incorpo.ro) | **Company-formation service** (deschidere firme); MCP is just a side-product for their own ONRC lookups | Not a dev hub; no API keys for developers |
| [demoanaf.ro/api-docs](https://demoanaf.ro/api-docs) | ANAF-only wrapper (CUI/balance) | Single vertical (fiscal), zero coverage of banks/couriers/health/etc |
| [florin-szilagyi efactura-sdk](https://github.com/florin-szilagyi/efactura-anaf-ts-sdk) | e-Factura-only TS SDK + MCP | Single API; useful upstream we can recommend |
| [openapi.ro](https://openapi.ro) | Paid commercial wrapper, ANAF+ONRC+BNR | Closed-source, no tutorials, narrow scope |
| [listafirme.eu / alertacui.ro](https://listafirme.eu) | Paid company-data monitoring | Vertical SaaS, not a dev portal |

**Our positioning**: the **only comprehensive RO API library** — one place for **all** API keys, sandbox creds, OpenAPI specs, tutorials, code samples, and MCP wrappers across **all 27 categories** (fiscal, banks, couriers, health, transport, energy, etc.). Open-source, free, community-owned. Think "BrasilAPI + RapidAPI + Mintlify, but for Romania."

## Recommended next moves

1. **Reverify 12 WAF-blocked sites** (task #8) using Playwright with real browser UA — many "broken" entries are just blocking automated clients
2. **Generate OpenAPI 3.1 specs** for top 10 services lacking them (start with ANAF VAT v9, BNR XML, e-Factura)
3. **Pilot one REST facade** end-to-end (CFR timetables is the easiest demo) to validate the BrasilAPI model
4. **Stand up Astro Starlight + `llms.txt` + MCP wrapper** with first 5 services to demo the stack
5. **Reach out to florin-szilagyi, aperta-sync, incorpo.ro** about collaboration vs competition

## Schema for downstream agents

Each per-service MD file has YAML frontmatter that automated agents can parse. Required fields:
- `slug`, `name`, `category`, `institution`, `status`, `verified_at`
- `auth`, `protocol`, `openapi_spec`, `sandbox_available`, `contract_required`
- `pricing`, `rate_limit`, `official_docs`, `api_base_url`, `last_known_version`
- `mandatory_for_business` (bool)

See `../templates/api-service.md` for full template.
