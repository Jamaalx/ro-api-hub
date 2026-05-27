---
slug: smartbill-cloud
title: SmartBill Cloud API
category: invoicing
institution: SmartBill SRL (Sibiu)
country: RO
status: active
verified_at: 2026-05-27
auth: basic_auth
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: subscription
rate_limit: "3 req/s"
official_docs: https://api.smartbill.ro/
api_base_url: https://ws.smartbill.ro/SBORO/api
last_known_version: unknown
mandatory_for_business: false
---

# SmartBill Cloud API

## Overview

SmartBill is one of the most-used RO invoicing SaaS platforms (factura electronica, e-Factura ANAF sync, stock, salaries). The REST API covers invoice/proforma/receipt CRUD, payments, stock, e-Factura upload status, clients and products. Auth is HTTP Basic with user email + API token from the SmartBill admin.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `/invoice` | Create invoice |
| GET | `/invoice/pdf?cif=...&seriesname=...&number=...` | Download invoice PDF |
| POST | `/invoice/cancel` | Cancel invoice |
| POST | `/invoice/payment` | Record payment |
| POST | `/estimate` | Create proforma |
| GET | `/stocks` | Stock levels |
| POST | `/einvoice/upload` | e-Factura ANAF upload (mandatory B2B since 2024) |

## Authentication

HTTP Basic: `Authorization: Basic base64(email:token)`. Token issued in SmartBill admin > Cont > API.

## Request example

```bash
curl -X POST 'https://ws.smartbill.ro/SBORO/api/invoice' \
  -u 'office@example.ro:apitoken' \
  -H 'Content-Type: application/json' \
  -d '{"companyVatCode":"RO43990858","client":{"name":"X"},"products":[...]}'
```

## Response example

```json
{ "number": "FACT0001", "series": "FACT", "url": "https://..." }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| PHP | `necenzurat/smartbill` | active | Packagist |
| PHP/Laravel | `andreilungeanu/smartbill` | active | Laravel facade |
| No-code | make.com app | active | Connector |

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available — no, test using a free/trial SmartBill account
- [ ] Local simulator

## Known issues / gotchas

- **Rate limit 3 req/s** — exceeding returns HTTP 429.
- e-Factura ANAF upload is async — status must be polled.
- Series must exist in account before creating invoices in that series.
- PDF endpoint returns binary; Content-Type may surprise content negotiators.
- VAT code format `RO12345678` for RO companies.

## Tutorial seeds (for content pipeline)

- "Issuing SmartBill invoice from Stripe webhook"
- "Polling SmartBill e-Factura ANAF status after upload"
- "Batching invoice creation under the 3 req/s SmartBill rate limit"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] OpenAPI 3.1 spec (community-built)
- [ ] Thin REST wrapper (rate-limited queue)
- [ ] MCP tool exposed via FastMCP
- [ ] Code samples (Node/Python/PHP)

## References

- Official docs: https://api.smartbill.ro/
- Public site: https://www.smartbill.ro/
- Last manual verification: 2026-05-27
