---
slug: florin-szilagyi-efactura-sdk
title: florin-szilagyi/efactura-anaf-ts-sdk — TypeScript e-Factura SDK (with MCP server)
category: community
institution: florin-szilagyi (open-source, MIT/contributor)
country: RO
status: active
verified_at: 2026-05-27
auth: oauth2
protocol: REST/XML
openapi_spec: partial
sandbox_available: true
contract_required: false
pricing: free
rate_limit: "matches ANAF upstream"
official_docs: https://github.com/florin-szilagyi/efactura-anaf-ts-sdk
api_base_url: https://api.anaf.ro/prod/FCTEL/rest/ (via SDK)
last_known_version: "(last commit 2026-05-07)"
mandatory_for_business: false
---

# florin-szilagyi/efactura-anaf-ts-sdk

## Overview

TypeScript SDK for ANAF e-Factura (upload, stareMesaj, listaMesaje, descarcare) plus OAuth2 + qualified-cert helpers. **Critically, the repo also ships an MCP server** — making it directly relevant to ro-api-hub's MCP-first strategy. Last commit 2026-05-07 — actively maintained. This is the most modern of the e-Factura SDKs and the natural starting point for any Node.js integration.

## Endpoints (covered by the SDK)

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `https://api.anaf.ro/prod/FCTEL/rest/upload` | Upload UBL invoice |
| GET | `https://api.anaf.ro/prod/FCTEL/rest/stareMesaj` | Check status |
| GET | `https://api.anaf.ro/prod/FCTEL/rest/listaMesaje` | List inbox |
| GET | `https://api.anaf.ro/prod/FCTEL/rest/descarcare` | Download response ZIP |
| OAuth | `https://logincert.anaf.ro/anaf-oauth2/v1/{authorize,token}` | Token flow |
| MCP | (bundled MCP server) | Exposes the above as MCP tools |

## Authentication

ANAF OAuth2 + qualified certificate. SDK provides helpers to bootstrap, refresh, and store tokens.

## Request example

```ts
import { EfacturaClient } from 'efactura-anaf-ts-sdk';

const client = new EfacturaClient({
  clientId: process.env.ANAF_CLIENT_ID!,
  clientSecret: process.env.ANAF_CLIENT_SECRET!,
  cert: process.env.ANAF_CERT_PATH!,
});

const resp = await client.upload({ cui: '14399840', xml: ublXml });
console.log(resp.index_incarcare);
```

## Response example

```json
{ "index_incarcare": "12345", "data_creare": "2026-05-27", "status": "ok" }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| TS | `github.com/florin-szilagyi/efactura-anaf-ts-sdk` | active 2026-05 | This entry |
| Go | `printesoi/e-factura-go` | active 2026-01 | Parallel impl |
| PHP | `andalisolutions/anaf-php` | active 2025-08 | Parallel impl |
| PHP | `mihai3332001/oauth2-anaf` | stale 2023 | OAuth helper only |

## Testing approach

- [x] Direct HTTP test against ANAF sandbox
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [x] Sandbox: ANAF test env (`api.anaf.ro/test/FCTEL/rest`)
- [x] Local simulator: pair with `aperta-sync/anaf-api-simulator`

## Known issues / gotchas

- OAuth callback URL must exactly match ANAF-registered URI
- Qualified cert must be issued by a Romanian-accredited CA
- Token refresh window is tight — handle reauth proactively
- MCP server transport (stdio vs HTTP) — confirm in repo README

## Tutorial seeds (for content pipeline)

- "Sending your first e-Factura from Node.js in 20 lines"
- "Wiring florin-szilagyi's MCP server into Claude Desktop for e-Factura"
- "OAuth2 + qualified cert: surviving the ANAF dance"
- "Migrating from manual XML upload scripts to efactura-anaf-ts-sdk"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site (flag MCP capability)
- [ ] **Could fork/wrap as canonical SDK** for ro-api-hub's TS surface
- [ ] Coordinate MCP tool naming with incorpo.ro to avoid namespace collisions
- [ ] Contribute upstream improvements rather than fork if maintainer is receptive
- [ ] Use as reference impl for OAuth2/cert flow in other SDKs

## References

- Repo: https://github.com/florin-szilagyi/efactura-anaf-ts-sdk
- Last commit: 2026-05-07
- Last manual verification: 2026-05-27
