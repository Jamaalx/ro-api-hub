---
slug: insse-tempo
title: INS TEMPO-Online
category: stats
institution: Institutul Național de Statistică (INS / INSSE)
country: RO
status: active
verified_at: 2026-05-27
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: unknown
official_docs: http://statistici.insse.ro/tempoins/?lang=en
api_base_url: http://statistici.insse.ro:8077/tempo-online/
last_known_version: unknown
mandatory_for_business: false
---

# INS TEMPO-Online

## Overview

TEMPO-Online is the Romanian National Statistics Institute's public statistical database, exposing thousands of multidimensional matrices (population, economy, labor, prices, etc.). The web UI is at `statistici.insse.ro/tempoins`; under the hood it speaks an undocumented but stable JSON REST API on port 8077 used by community wrappers (`gov2-ro/tempo-ins-dump`, R package `tempo`). Both the website and `gov2-ro/tempo-ins-dump` (last commit 2026-05-07) confirm active operation.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `http://statistici.insse.ro:8077/tempo-online/` | API root |
| GET | `http://statistici.insse.ro:8077/tempo-online/matrix/...` | Matrix metadata |
| GET | `http://statistici.insse.ro:8077/tempo-online/data/...` | Data slice |

Exact endpoint shapes are reverse-engineered from the UI's network traffic; see `gov2-ro/tempo-ins-dump` for the canonical mapping.

## Authentication

None.

## Request example

```bash
# See gov2-ro/tempo-ins-dump for working request templates
curl 'http://statistici.insse.ro:8077/tempo-online/...'
```

## Response example

```json
{ "matrix": "POP106A", "dimensions": [ ... ], "values": [ ... ] }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Python | `gov2-ro/tempo-ins-dump` | active 2026-05-07 | FastAPI + DuckDB + Parquet normalizer |
| R | `tempo` | community | R wrapper |

## Testing approach

- [x] Direct HTTP test (port 8077)
- [ ] Playwright needed (for UI scraping only)
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator (gov2-ro/tempo-ins-dump can run locally on dumped Parquet)

## Known issues / gotchas

- Endpoint uses plain **HTTP** (not HTTPS) on port 8077 — mixed-content issues in browsers; proxy via HTTPS if embedding
- API is semi-official / undocumented; matrix codes and dimension orders can change without notice
- Large matrices can be slow — prefer the normalized Parquet dumps from `gov2-ro/tempo-ins-dump` for batch use

## Tutorial seeds (for content pipeline)

- "Querying Romanian census data with the TEMPO-Online JSON API"
- "Caching INS TEMPO matrices as Parquet for analytics"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] OpenAPI 3.1 spec authored from observed traffic
- [ ] HTTPS-terminating proxy
- [ ] MCP tool: `tempo.query(matrix, filters)`

## References

- Web UI: http://statistici.insse.ro/tempoins/?lang=en
- Normalizer: https://github.com/gov2-ro/tempo-ins-dump
- INS: https://insse.ro/
- Last manual verification: 2026-05-27
