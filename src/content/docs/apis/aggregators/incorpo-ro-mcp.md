---
slug: incorpo-ro-mcp
title: incorpo.ro — MCP Romania (ONRC + ANAF + Justice)
category: aggregator
institution: incorpo.ro (commercial, open-source)
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: none
protocol: REST/JSON
openapi_spec: partial
sandbox_available: true
contract_required: false
pricing: freemium
rate_limit: "unknown — server-side throttling"
official_docs: https://www.incorpo.ro/en-us/tools/mcp-romania/
api_base_url: https://mcp.incorpo.ro/mcp
last_known_version: unknown
mandatory_for_business: false
---

# incorpo.ro — MCP Romania

## Overview

**The first Model Context Protocol (MCP) server for Romanian public data** — exposes ONRC (companies registry), ANAF (fiscal), and Ministry of Justice (judicial) records to AI agents via the standard MCP protocol. Endpoint: `https://mcp.incorpo.ro/mcp`. The reference implementation is open-source at `github.com/incorporo`. **This is a direct competitor for the AI-agents angle of ro-api-hub** and the most strategically important entry in this catalogue.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| MCP | `https://mcp.incorpo.ro/mcp` | MCP transport endpoint (tools/list, tools/call, resources, prompts) |

MCP tools (typical, confirm via `tools/list`):

- `search_company` — by name / CUI / CAEN
- `company_details` — full ONRC + ANAF aggregate
- `judicial_cases` — Ministry of Justice records linked to entity
- `validate_cui` — checksum + ANAF active status

## Authentication

No auth declared on the public landing — server-side throttling expected. Confirm whether keys are required for production / higher tiers via incorpo.ro account.

## Request example

```bash
# MCP HTTP transport (JSON-RPC 2.0)
curl -X POST https://mcp.incorpo.ro/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

## Response example

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": { "tools": [ { "name": "search_company", "description": "..." } ] }
}
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | Any MCP client (Claude Desktop, Cursor, OpenAI Agents) | active 2026 | Standard MCP transport |
| — | `github.com/incorporo` | active | Open-source reference impl |

## Testing approach

- [x] Direct HTTP test (curl / fetch JSON-RPC)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [x] Sandbox available — public endpoint usable for dev
- [ ] Local simulator — clone github.com/incorporo

## Known issues / gotchas

- MCP transport variants (stdio vs streamable HTTP vs SSE) — confirm which is active
- Rate limits not published; aggressive use likely throttled
- Data freshness depends on incorpo.ro's ingestion cadence vs official ANAF/ONRC
- License of the open-source repo to be confirmed before forking

## Tutorial seeds (for content pipeline)

- "Wiring incorpo.ro MCP into Claude Desktop for RO due-diligence"
- "incorpo.ro MCP vs building your own with FastMCP on ANAF v9"
- "Self-hosting the incorpo.ro reference implementation"
- "Why MCP > REST for AI-driven KYC workflows"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site — flag as primary competitor
- [ ] Compatibility matrix: ro-api-hub MCP tool names vs incorpo.ro tool names
- [ ] Decide positioning: superset (more sources) vs deeper (e-Factura, e-Transport, INS, BNR included)
- [ ] Could fork/wrap as canonical SDK if license permits
- [ ] Benchmark latency & data freshness vs official endpoints

## References

- Landing: https://www.incorpo.ro/en-us/tools/mcp-romania/
- MCP endpoint: https://mcp.incorpo.ro/mcp
- GitHub org: https://github.com/incorporo
- Last manual verification: 2026-05-27
- **Missing data**: license, exact tool catalogue, rate-limit policy
