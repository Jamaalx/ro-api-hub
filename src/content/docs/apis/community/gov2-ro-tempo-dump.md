---
slug: gov2-ro-tempo-dump
title: gov2-ro/tempo-ins-dump — INS TEMPO Normalizer (FastAPI + DuckDB + Parquet)
category: community
institution: gov2-ro (open-source)
country: RO
status: active
verified_at: 2026-05-27
auth: none
protocol: REST/JSON | static_files
openapi_spec: partial
sandbox_available: true
contract_required: false
pricing: free
rate_limit: "self-hosted (no upstream constraint when reading Parquet)"
official_docs: https://github.com/gov2-ro/tempo-ins-dump
api_base_url: (self-hosted FastAPI)
last_known_version: "(last commit 2026-05-07)"
mandatory_for_business: false
---

# gov2-ro/tempo-ins-dump

## Overview

Active 2026 project that pulls the INS TEMPO-Online statistical catalogue, normalizes it, and republishes as ~3.7k Parquet files queryable via DuckDB, plus a FastAPI layer for HTTP access. Solves a major pain point: TEMPO's undocumented REST surface and Romanian-only metadata. This is the right backend for any analytics or BI use case over Romanian official statistics.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `(FastAPI)/datasets` | List available TEMPO datasets |
| GET | `(FastAPI)/dataset/{id}` | Dataset metadata + Parquet pointer |
| (Parquet) | `(static)/path/to/file.parquet` | Direct download for DuckDB / Pandas |

## Authentication

None (self-hosted; gate at your reverse proxy if needed).

## Request example

```bash
git clone https://github.com/gov2-ro/tempo-ins-dump
# follow README for ingestion + uvicorn startup
duckdb -c "SELECT * FROM read_parquet('data/POP101A.parquet') LIMIT 10"
```

## Response example

DuckDB returns tabular rows. FastAPI returns JSON dataset metadata.

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Python | `gov2-ro/tempo-ins-dump` | active 2026-05 | This entry |
| R | `tempo` | various | Older R wrapper around the same INS surface |

## Testing approach

- [x] Direct HTTP test against FastAPI
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [x] Sandbox — runs locally
- [x] Local simulator: it IS local

## Known issues / gotchas

- Initial ingestion is slow (many datasets, INS rate-limits)
- Parquet schema may evolve as INS publishes new dimensions
- Romanian-only metadata in some datasets — wrap with translation layer if needed
- Disk space ~ multi-GB for full dump

## Tutorial seeds (for content pipeline)

- "Querying Romanian census data in 5 seconds with DuckDB + tempo-ins-dump"
- "Building a BI dashboard on INS statistics with FastAPI + Parquet"
- "Why DuckDB+Parquet beats raw TEMPO-Online for analytics"
- "Wrapping tempo-ins-dump behind an MCP tool"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site (flagship community project for INS)
- [ ] **Use as reference impl** for ro-api-hub's INS/statistics layer
- [ ] Could fork/wrap as canonical SDK and host an authoritative public deployment
- [ ] Expose as MCP tool via FastMCP (LLM-friendly statistics queries)
- [ ] Mirror the Parquet dump to ro-api-hub CDN for low-latency access

## References

- Repo: https://github.com/gov2-ro/tempo-ins-dump
- Last commit: 2026-05-07
- Upstream: INS TEMPO-Online (statistici.insse.ro)
- Last manual verification: 2026-05-27
