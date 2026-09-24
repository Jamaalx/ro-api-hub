---
slug: printesoi-efactura-go
title: printesoi/e-factura-go — Go SDK for ANAF e-Factura
category: community
institution: printesoi (open-source)
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: oauth2
protocol: REST/XML
openapi_spec: false
sandbox_available: true
contract_required: false
pricing: free
rate_limit: "matches ANAF upstream"
official_docs: https://github.com/printesoi/e-factura-go
api_base_url: https://api.anaf.ro/prod/FCTEL/rest/ (via SDK)
last_known_version: "(last commit 2026-01-30)"
mandatory_for_business: false
---

# printesoi/e-factura-go

## Overview

Idiomatic Go SDK for ANAF e-Factura: upload, status, list, download, plus OAuth2 helpers. Last commit 2026-01-30 — active. Most mature Go option for the e-Factura mandate. Useful for backend services that prefer Go for performance/binary distribution (e.g. invoicing engines, ERP integrations).

## Endpoints (covered)

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `https://api.anaf.ro/prod/FCTEL/rest/upload` | Upload UBL invoice |
| GET | `https://api.anaf.ro/prod/FCTEL/rest/stareMesaj` | Status |
| GET | `https://api.anaf.ro/prod/FCTEL/rest/listaMesaje` | Inbox |
| GET | `https://api.anaf.ro/prod/FCTEL/rest/descarcare` | Download |

## Authentication

ANAF OAuth2 + qualified cert. SDK exposes `Client` with token + cert configuration.

## Request example

```go
import "github.com/printesoi/e-factura-go/efactura"

client, _ := efactura.NewClient(efactura.Config{
    ClientID:     os.Getenv("ANAF_CLIENT_ID"),
    ClientSecret: os.Getenv("ANAF_CLIENT_SECRET"),
    CertPath:     os.Getenv("ANAF_CERT_PATH"),
})

resp, err := client.Upload(ctx, cui, xmlBytes)
```

## Response example

```json
{ "index_incarcare": "12345", "data_creare": "2026-05-27" }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Go | `github.com/printesoi/e-factura-go` | active 2026-01 | This entry |
| TS | `florin-szilagyi/efactura-anaf-ts-sdk` | active 2026-05 | Parallel + MCP |
| PHP | `andalisolutions/anaf-php` | active 2025-08 | Parallel |

## Testing approach

- [x] Direct HTTP test against ANAF sandbox
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [x] Sandbox: ANAF test env
- [x] Local simulator: `aperta-sync/anaf-api-simulator`

## Known issues / gotchas

- Go's `crypto/tls` requires cert + key in PEM; convert P12 if needed
- Module path stability — pin a tag in go.mod
- OAuth2 refresh races under concurrent goroutines — wrap with singleflight

## Tutorial seeds (for content pipeline)

- "Sending an e-Factura from Go in 30 lines"
- "Concurrent invoice upload with printesoi/e-factura-go + worker pool"
- "Cross-language parity: Go vs TS vs PHP e-Factura SDKs benchmarked"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] Could fork/wrap as canonical Go SDK for ro-api-hub
- [ ] Use as reference impl for Go bindings of ro-api-hub facade
- [ ] Contribute MCP support upstream (currently TS SDK has it, Go does not)

## References

- Repo: https://github.com/printesoi/e-factura-go
- Last commit: 2026-01-30
- Last manual verification: 2026-05-27
