---
slug: aperta-sync-anaf-simulator
title: aperta-sync/anaf-api-simulator — Local ANAF Dev Sandbox
category: aggregator
institution: aperta-sync (open-source)
country: RO
status: active
verified_at: 2026-05-27
auth: none
protocol: REST/JSON
openapi_spec: partial
sandbox_available: true
contract_required: false
pricing: free
rate_limit: "none (runs locally)"
official_docs: https://github.com/aperta-sync/anaf-api-simulator
api_base_url: http://localhost:PORT/ (configurable)
last_known_version: "v0.8.1 (2026-05-14)"
mandatory_for_business: false
---

# aperta-sync/anaf-api-simulator

## Overview

Open-source local simulator of the ANAF API surface (e-Factura, VAT, SPV) for development and CI testing without hitting the real ANAF sandbox (which itself has registration and certificate friction). Latest release v0.8.1 (2026-05-14) — actively maintained. Ideal for ro-api-hub CI/CD pipelines where deterministic responses are required.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| All | `http://localhost:PORT/...` | Mirrors ANAF endpoints (e-Factura upload/stareMesaj/listaMesaje, VAT v9, OAuth flows) |

## Authentication

Local: typically none; can be configured to require fake OAuth tokens for full-stack testing of cert + OAuth code paths.

## Request example

```bash
# Run the simulator
docker run -p 8080:8080 ghcr.io/aperta-sync/anaf-api-simulator:0.8.1

# Hit it like real ANAF
curl -X POST http://localhost:8080/prod/FCTEL/rest/upload \
  -H 'Content-Type: text/xml' \
  --data-binary @invoice.xml
```

## Response example

```xml
<header xmlns="..." index_incarcare="12345" data_creare="2026-05-27"/>
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | Use any ANAF SDK pointed at localhost | active | Works as drop-in |

## Testing approach

- [x] Direct HTTP test
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [x] Sandbox — this IS the sandbox
- [x] Local simulator: `docker run aperta-sync/anaf-api-simulator`

## Known issues / gotchas

- Simulator surface may lag real ANAF schema changes
- Confirm which endpoints/versions are mocked vs stubbed
- Not a replacement for staging tests against the real ANAF test environment before production

## Tutorial seeds (for content pipeline)

- "CI-friendly e-Factura testing with aperta-sync simulator"
- "Switching between real ANAF sandbox and local simulator via env var"
- "Mocking OAuth2 + qualified cert flows in tests"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] Use in ro-api-hub CI pipeline as default test backend
- [ ] Contribute back schemas / endpoints discovered during ro-api-hub development
- [ ] Could fork/wrap as canonical SDK companion (recommend it as the dev backend)
- [ ] Document docker-compose snippet for combined ro-api-hub + simulator

## References

- Repo: https://github.com/aperta-sync/anaf-api-simulator
- Latest release: v0.8.1 (2026-05-14)
- Last manual verification: 2026-05-27
