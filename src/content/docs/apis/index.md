---
title: Catalog complet (master index)
description: 124 servicii API românești în 27 de categorii — status, autentificare, endpoint-uri și linkuri către fișa fiecăruia.
sidebar:
  order: 0
---

> 124 per-service MDs across 27 categories. One file per API/service. All use the YAML frontmatter schema in `../templates/api-service.md` — parsable by downstream agents (Playwright probes, OpenAPI generators, MCP wrappers, tutorial pipelines).

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
| ✅ | [anaf-vat-v9](public/fiscal/anaf-vat-v9.md) | Current ANAF VAT/CUI verification |
| ⚠️ | [anaf-vat-v8-async](public/fiscal/anaf-vat-v8-async.md) | v8 retired 2025-05-01 — migrate to v9 |
| ✅ | [anaf-efactura-prod](public/fiscal/anaf-efactura-prod.md) | Mandatory B2B; OAuth2 + qualified cert |
| ✅ | [anaf-efactura-test](public/fiscal/anaf-efactura-test.md) | Sandbox |
| ✅ | [anaf-etransport](public/fiscal/anaf-etransport.md) | Mandatory; PDF guide stale (use 2025 version) |
| ✅ | [anaf-oauth2](public/fiscal/anaf-oauth2.md) | Token service for all ANAF APIs |
| ✅ | [anaf-spv](public/fiscal/anaf-spv.md) | Mailbox: messages between taxpayer and ANAF |
| ✅ | [anaf-saf-t](public/fiscal/anaf-saf-t.md) | Schema v249, last update 2026-02-19 |
| ✅ | [anaf-etva](public/fiscal/anaf-etva.md) | Pre-filled VAT returns (new) |
| 🔒 | [anaf-cazier-fiscal](public/fiscal/anaf-cazier-fiscal.md) | Inter-institutional only |

### Finance (8) — `apis/public/finance/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [bnr-fx-today](public/finance/bnr-fx-today.md) | Daily XML, 46 currencies |
| ✅ | [bnr-fx-10days](public/finance/bnr-fx-10days.md) | |
| ✅ | [bnr-fx-yearly](public/finance/bnr-fx-yearly.md) | Yearly history per year |
| ⚠️ | [bnr-interactive-db](public/finance/bnr-interactive-db.md) | Host fix: bnro.ro → bnr.ro |
| ⚠️ | [bnr-robor](public/finance/bnr-robor.md) | Scrape-only, WAF on PDF |
| 🚨 | [asf-registers](public/finance/asf-registers.md) | **/en/a/1544/ returns 404** — needs new URL |
| 🔒 | [bvb-arena-datafeed](public/finance/bvb-arena-datafeed.md) | Paywall (contract) |
| 🔒 | [bvb-arenaxt](public/finance/bvb-arenaxt.md) | Paywall; protocol PDF v3.1.3 (2019) |

### Registry (2) — `apis/public/registry/`
| Status | File | Notes |
|--------|------|-------|
| 🔒 | [onrc-recom](public/registry/onrc-recom.md) | Paid bulk access; onrc.ro "under construction" |
| ⚠️ | [onrc-opendata](public/registry/onrc-opendata.md) | Datasets stale on data.gov.ro |

### Statistics (2) — `apis/public/stats/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [insse-tempo](public/stats/insse-tempo.md) | TEMPO-Online; community dump `gov2-ro/tempo-ins-dump` very active |
| 🔒 | [insse-esop](public/stats/insse-esop.md) | Login required |

### Geo (9) — `apis/public/geo/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [ancpi-geoportal](public/geo/ancpi-geoportal.md) | ArcGIS REST + GeoJSON |
| ✅ | [ancpi-inspire-wfs](public/geo/ancpi-inspire-wfs.md) | OGC WFS 2.0 cadastral parcels |
| ⚠️ | [ancpi-eterra](public/geo/ancpi-eterra.md) | 301 → MyEterra |
| 🔒 | [ancpi-myeterra](public/geo/ancpi-myeterra.md) | Notary/pro access |
| ✅ | [anm-weather-xml](public/geo/anm-weather-xml.md) | 5 XML feeds documented; reuse needs contract |
| ✅ | [anm-inspire](public/geo/anm-inspire.md) | WMS 1.3 + WFS, INSPIRE conformant |
| ⚠️ | [anar-gis-portal](public/geo/anar-gis-portal.md) | TLS cert mismatch |
| ✅ | [inhga-hydrology](public/geo/inhga-hydrology.md) | Active 2026-04-23 |
| ✅ | [geo-spatial-org](public/geo/geo-spatial-org.md) | OSGeo-RO chapter; active 2026-01-22 |

### Health (4) — `apis/public/health/`
| Status | File | Notes |
|--------|------|-------|
| 🔒 | [cnas-pias-siui](public/health/cnas-pias-siui.md) | SOAP WSDL; WAF 403 + cert; mandatory for providers |
| 🔒 | [cnas-sipe](public/health/cnas-sipe.md) | E-prescriptions, same gating |
| ✅ | [cnas-ecard](public/health/cnas-ecard.md) | Windows DLL SDK (not HTTP) |
| ✅ | [cnas-asigurat-status](public/health/cnas-asigurat-status.md) | CNP+name web form (no API) |

### Transport (6) — `apis/public/transport/`
| Status | File | Notes |
|--------|------|-------|
| ❌ | [cnair-rovinieta](public/transport/cnair-rovinieta.md) | Just redirects to erovinieta |
| 🔒 | [erovinieta](public/transport/erovinieta.md) | Distributor contract; WAF 403 |
| 🚨 | [rar-auto-pass](public/transport/rar-auto-pass.md) | **SUSPENDED** ("aplicația Istoric Vehicul este suspendat") |
| ✅ | [drpciv](public/transport/drpciv.md) | JS-rendered, needs Playwright |
| ✅ | [cfr-mersultrenurilor](public/transport/cfr-mersultrenurilor.md) | Internal JSON, undocumented; 1900+ trains |
| ✅ | [arr](public/transport/arr.md) | Active 2026, sub-apps testare/licente/etc |

### Justice (2) — `apis/public/justice/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [portal-just-ecris](public/justice/portal-just-ecris.md) | SOAP at portalquery.just.ro |
| ✅ | [monitorul-oficial](public/justice/monitorul-oficial.md) | 2 lei/pagină |

### Identity (3) — `apis/public/identity/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [roeid](public/identity/roeid.md) | National SSO; OIDC + SAML 2.0; eIDAS-notified |
| ✅ | [sts-ca](public/identity/sts-ca.md) | Qualified certs CA |
| 🔒 | [depabd](public/identity/depabd.md) | Inter-institutional only |

### Gov (3) — `apis/public/gov/`
| Status | File | Notes |
|--------|------|-------|
| 🔒 | [ghiseul-snep](public/gov/ghiseul-snep.md) | Institution enrollment; 8.5M tx/2024 |
| ✅ | [e-guvernare](public/gov/e-guvernare.md) | Aggregator portal |
| ✅ | [catalog-servicii-publice](public/gov/catalog-servicii-publice.md) | 2900+ services |

### Open Data (2) — `apis/public/opendata/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [data-gov-ro-ckan](public/opendata/data-gov-ro-ckan.md) | CKAN API verified, 2000+ packages |
| ⚠️ | [govro-github](public/opendata/govro-github.md) | Last activity 2017 |

### Procurement (2) — `apis/public/procurement/`
| Status | File | Notes |
|--------|------|-------|
| ⚠️ | [seap-sicap](public/procurement/seap-sicap.md) | JS-rendered |
| ⚠️ | [ocds-ro0046](public/procurement/ocds-ro0046.md) | OCDS pilot |

### Elections (1) — `apis/public/elections/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [aep-prezenta](public/elections/aep-prezenta.md) | Static JSON dumps per cycle |

### Regulators / civic (7) — `apis/public/regulators/`
| Status | File | Notes |
|--------|------|-------|
| ⚠️ | [anre](public/regulators/anre.md) | TLS cert error; no API |
| ⚠️ | [ancom-netograf](public/regulators/ancom-netograf.md) | JS-rendered; no public API |
| ✅ | [anspdcp](public/regulators/anspdcp.md) | Active 2026 |
| ✅ | [posta-romana-track](public/regulators/posta-romana-track.md) | B2B contract for bulk |
| ⚠️ | [code4ro-civichq](public/regulators/code4ro-civichq.md) | Last commit 2019 |
| 🚨 | [code4ro-monitorizare-vot](public/regulators/code4ro-monitorizare-vot.md) | **ARCHIVED 2025-05-26** |
| ✅ | [peviitor-orase](public/regulators/peviitor-orase.md) | NGO, very active |

---

## PRIVATE SECTOR (50)

### Banks PSD2 (10) — `apis/private/banks/`
All: ✅ active sandbox, contract for prod, OAuth2 + eIDAS QWAC, Berlin Group spec.
> Finqware benchmark: 3 of 16 RO PSD2 APIs broken in prod.

| File | Notes |
|------|-------|
| [bcr-erste-psd2](private/banks/bcr-erste-psd2.md) | 8+ APIs |
| [bt-psd2](private/banks/bt-psd2.md) | Largest RO bank |
| [brd-psd2](private/banks/brd-psd2.md) | Retail + corporate |
| [ing-ro-psd2](private/banks/ing-ro-psd2.md) | Best docs |
| [raiffeisen-ro-psd2](private/banks/raiffeisen-ro-psd2.md) | Only RO w/ PIISP at launch |
| [cec-bank-psd2](private/banks/cec-bank-psd2.md) | State-owned |
| [otp-ro-psd2](private/banks/otp-ro-psd2.md) | 4 refreshes/day limit |
| [alpha-bank-ro-psd2](private/banks/alpha-bank-ro-psd2.md) | Transaction data unstructured |
| [libra-bank-psd2](private/banks/libra-bank-psd2.md) | + premium API Banking |
| [garanti-bbva-ro-psd2](private/banks/garanti-bbva-ro-psd2.md) | Layer7 portal |

### Payments (6) — `apis/private/payments/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [netopia-mobilpay](private/payments/netopia-mobilpay.md) | Full official SDKs `github.com/mobilpay` |
| ✅ | [euplatesc](private/payments/euplatesc.md) | Community wrappers |
| ✅ | [twispay-xmoney](private/payments/twispay-xmoney.md) | Rebranded |
| ✅ | [plationline](private/payments/plationline.md) | Docs on request |
| ✅ | [smart2pay-nuvei](private/payments/smart2pay-nuvei.md) | 200+ APMs |
| ✅ | [stripe-ro](private/payments/stripe-ro.md) | Klarna 4.99% + 1.50 RON |

### Couriers (6) — `apis/private/couriers/`
All ✅ active (contract for prod).
| File | Notes |
|------|-------|
| [sameday](private/couriers/sameday.md) | + easybox locker SDK |
| [fan-courier](private/couriers/fan-courier.md) | Repo docs on GitHub |
| [cargus](private/couriers/cargus.md) | Azure APIM, Swagger |
| [dpd-ro](private/couriers/dpd-ro.md) | Swagger at api.dpd.ro |
| [gls-ro](private/couriers/gls-ro.md) | Account-only docs |
| [innoship](private/couriers/innoship.md) | Multi-courier aggregator, Swagger live |

### Telecom (4) — `apis/private/telecom/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [orange-ro-camara](private/telecom/orange-ro-camara.md) | CAMARA APIs; 5G Lab sandbox |
| ❌ | [vodafone-ro](private/telecom/vodafone-ro.md) | No public dev portal |
| ❌ | [digi-rcs-rds](private/telecom/digi-rcs-rds.md) | No public dev portal |
| ❌ | [telekom-ro](private/telecom/telekom-ro.md) | **DEFUNCT 2025** |

### Marketplaces (3) — `apis/private/marketplaces/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [emag-marketplace](private/marketplaces/emag-marketplace.md) | Basic auth, ~3 req/s |
| ✅ | [olx-storia-re](private/marketplaces/olx-storia-re.md) | OAuth2, Swagger |
| ❌ | [olx-ro-classifieds](private/marketplaces/olx-ro-classifieds.md) | No public classifieds API |

### SMS (1) — `apis/private/sms/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [smso-ro](private/sms/smso-ro.md) | 100 free SMS on signup |

### Invoicing (6) — `apis/private/invoicing/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [smartbill-cloud](private/invoicing/smartbill-cloud.md) | 3 req/s |
| ✅ | [oblio](private/invoicing/oblio.md) | Cheaper alternative |
| 🔒 | [fgo](private/invoicing/fgo.md) | Enterprise plan only |
| ✅ | [facturis-online](private/invoicing/facturis-online.md) | Docs on request |
| ❌ | [saga-soft](private/invoicing/saga-soft.md) | Desktop only, use Oblio/FGO sync |
| ✅ | [nexus-erp](private/invoicing/nexus-erp.md) | Per-app key |

### Maps (2) — `apis/private/maps/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [geo-spatial-org-datasets](private/maps/geo-spatial-org-datasets.md) | CC/Free |
| ✅ | [osm-ro-geofabrik](private/maps/osm-ro-geofabrik.md) | ODbL |

### Jobs (3) — `apis/private/jobs/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [peviitor-jobs](private/jobs/peviitor-jobs.md) | Open-source NGO; 1661 commits |
| ❌ | [ejobs-ro](private/jobs/ejobs-ro.md) | No public API |
| ❌ | [bestjobs-ro](private/jobs/bestjobs-ro.md) | No public API |

### Energy (3) — `apis/private/energy/`
All ❌ broken (no public API). Tutorials → Playwright/Camoufox scraping.
| File |
|------|
| [ppc-enel](private/energy/ppc-enel.md) |
| [anre-tariffs](private/energy/anre-tariffs.md) |
| [hidroelectrica](private/energy/hidroelectrica.md) |

### Insurance (2) — `apis/private/insurance/`
| Status | File | Notes |
|--------|------|-------|
| 🔒 | [troco-rca](private/insurance/troco-rca.md) | B2B contract |
| 🔒 | [pago-iasigurare](private/insurance/pago-iasigurare.md) | Partner only |

---

## AGGREGATORS (8) — `apis/aggregators/`
| Status | File | Notes |
|--------|------|-------|
| ✅ | [openapi-ro](aggregators/openapi-ro.md) | Free 100 req/mo; CIF/CNP/IBAN |
| 🔒 | [listafirme-eu](aggregators/listafirme-eu.md) | Credit-based |
| 🔒 | [alertacui-ro](aggregators/alertacui-ro.md) | Subscription monitoring |
| ⭐ | [incorpo-ro-mcp](aggregators/incorpo-ro-mcp.md) | **MAIN COMPETITOR — first MCP server for RO public data** |
| ✅ | [everifica-ro](aggregators/everifica-ro.md) | Free UI |
| ⭐ | [demoanaf-ro](aggregators/demoanaf-ro.md) | Modern REST/JSON, Redis-cached — direct competitor |
| ✅ | [aperta-sync-anaf-simulator](aggregators/aperta-sync-anaf-simulator.md) | Local dev simulator |
| ✅ | [eranova-datacore](aggregators/eranova-datacore.md) | REST cache proxy |

## COMMUNITY (9) — `apis/community/`
| Status | File | Notes |
|--------|------|-------|
| ⭐ | [florin-szilagyi-efactura-sdk](community/florin-szilagyi-efactura-sdk.md) | **Already bundles MCP server** |
| ✅ | [printesoi-efactura-go](community/printesoi-efactura-go.md) | Go SDK |
| ✅ | [andalisolutions-anaf-php](community/andalisolutions-anaf-php.md) | PHP 8.2+ |
| ✅ | [itrack-anaf-packagist](community/itrack-anaf-packagist.md) | Legacy PHP |
| ⚠️ | [mfpanaf-clientspv](community/mfpanaf-clientspv.md) | Official sample, abandoned |
| ⚠️ | [sibies-just-net](community/sibies-just-net.md) | Stale 2021 |
| ✅ | [gov2-ro-tempo-dump](community/gov2-ro-tempo-dump.md) | FastAPI + DuckDB + Parquet |
| ⚠️ | [gov2-ro-prezenta-dump](community/gov2-ro-prezenta-dump.md) | Stale 2024 |
| ⚠️ | [mihai3332001-oauth2-anaf](community/mihai3332001-oauth2-anaf.md) | Stale 2023 |

---

## Status totals (124)

| Status | Count |
|--------|-------|
| ✅ active | 67 |
| ⚠️ stale | 18 |
| 🔒 gated | 18 |
| ❌ broken/missing | 14 |
| 🚨 critical | 3 (RAR Auto Pass, ASF /1544/, monitorizare-vot archived) |
| ⭐ adjacent (single-vertical, not competitors) | 3 (incorpo.ro, demoanaf.ro, florin-szilagyi sdk) |

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
