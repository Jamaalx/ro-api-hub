---
slug: andalisolutions-anaf-php
title: andalisolutions/anaf-php — PHP SDK for ANAF (e-Factura + VAT + SPV)
category: community
institution: andalisolutions (open-source)
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: oauth2
protocol: REST/JSON | REST/XML
openapi_spec: false
sandbox_available: true
contract_required: false
pricing: free
rate_limit: "matches ANAF upstream"
official_docs: https://github.com/andalisolutions/anaf-php
api_base_url: https://api.anaf.ro/prod/ (via SDK)
last_known_version: "v0.8.1 (2025-08-19)"
mandatory_for_business: false
---

# andalisolutions/anaf-php

## Overview

Modern PHP 8.2+ SDK covering ANAF surfaces: VAT v9, e-Factura (upload/status/list/download), OAuth2 flow. Last release v0.8.1 (2025-08-19) — active. Strong choice for the very large PHP-based Romanian SaaS / e-commerce ecosystem (WooCommerce, Magento, custom invoicing).

## Endpoints (covered)

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `https://webservicesp.anaf.ro/PlatitorTvaRest/api/v9/ws/tva` | VAT lookup |
| POST | `https://api.anaf.ro/prod/FCTEL/rest/upload` | Upload UBL |
| GET | `https://api.anaf.ro/prod/FCTEL/rest/{stareMesaj,listaMesaje,descarcare}` | Status / list / download |
| OAuth | `https://logincert.anaf.ro/anaf-oauth2/v1/{authorize,token}` | Token flow |

## Authentication

OAuth2 + qualified cert; SDK provides token storage interface.

## Request example

```php
use Andalisolutions\Anaf\Client;

$client = new Client([
    'client_id'     => getenv('ANAF_CLIENT_ID'),
    'client_secret' => getenv('ANAF_CLIENT_SECRET'),
    'cert_path'     => getenv('ANAF_CERT_PATH'),
]);

$resp = $client->efactura()->upload($cui, $ublXml);
```

## Response example

```json
{ "index_incarcare": "12345", "data_creare": "2026-05-27" }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| PHP | `andalisolutions/anaf-php` | active 2025-08 | This entry |
| PHP | `itrack/anaf` | active | VAT-focused, v2 vs v3 breaking |
| PHP | `mihai3332001/oauth2-anaf` | stale 2023 | OAuth helper only, abandoned |

## Testing approach

- [x] Direct HTTP test against ANAF sandbox
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [x] Sandbox: ANAF test env
- [x] Local simulator: `aperta-sync/anaf-api-simulator`

## Known issues / gotchas

- PHP 8.2+ required — won't run on legacy hosts
- Composer constraint on cURL extension + OpenSSL ≥ 1.1
- Cert loading: P12 vs PEM conversion gotcha on shared hosting

## Tutorial seeds (for content pipeline)

- "Adding e-Factura to a WooCommerce store with andalisolutions/anaf-php"
- "Laravel service-provider wrapper for ANAF SDK"
- "Choosing between andalisolutions/anaf-php and itrack/anaf"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] **Could fork/wrap as canonical PHP SDK** for ro-api-hub
- [ ] Use as reference impl for PHP bindings of ro-api-hub facade
- [ ] Provide Laravel + Symfony adapters in ro-api-hub

## References

- Repo: https://github.com/andalisolutions/anaf-php
- Latest release: v0.8.1 (2025-08-19)
- Last manual verification: 2026-05-27
