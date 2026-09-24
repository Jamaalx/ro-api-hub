---
slug: sibies-just-net
title: sibies/Just.Net — C# Portal Just SOAP client (stale)
category: community
institution: sibies (open-source)
country: RO
status: stale
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: none
protocol: SOAP
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: "matches Portal Just upstream"
official_docs: https://github.com/sibies/Just.Net
api_base_url: http://portalquery.just.ro/query.asmx
last_known_version: "(7 commits, no releases — last activity 2021-12-05)"
mandatory_for_business: false
---

# sibies/Just.Net

## Overview

C# .NET client for Portal Just (ECRIS) — the Romanian Ministry of Justice case-search SOAP web service at `portalquery.just.ro/query.asmx`. **Stale** — last activity 2021-12-05, only 7 commits, no releases. The underlying SOAP endpoint is still active, so the library is theoretically still functional but unmaintained.

## Endpoints (covered)

| Method | URL | Purpose |
|--------|-----|---------|
| SOAP | `http://portalquery.just.ro/query.asmx` | Query court cases (dosare) by number/party/court |

## Authentication

None — Portal Just SOAP service is public.

## Request example

```csharp
// See repo for the generated SOAP client wrapper
var client = new PortalJustClient();
var cases = client.CautareDosare(new SearchParams { /* ... */ });
```

## Response example

SOAP XML envelope with a `Dosar` collection (case number, court, parties, hearings).

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| C# | `sibies/Just.Net` | stale (2021) | This entry |
| — | None other public | — | Most consumers code raw SOAP |

## Testing approach

- [x] Direct HTTP test (SOAP envelope)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- TLS cert quirks on portal.just.ro (verified in catalogue) — may need `ServerCertificateValidationCallback` overrides
- SOAP schema not versioned visibly — break risk if Ministry changes WSDL
- Project targets old .NET Framework — port to .NET 8+ likely needed

## Tutorial seeds (for content pipeline)

- **"Fork-and-revive: modernizing sibies/Just.Net to .NET 8"** — what to update (target framework, WSDL regen, async/await, dependency injection, NuGet packaging)
- "Querying Romanian court cases from C# in 2026"
- "Wrapping SOAP Portal Just as REST/JSON for modern consumers"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site (mark as stale)
- [ ] Use as reference impl when building ro-api-hub's Portal Just facade
- [ ] Consider fork-and-revive if .NET ecosystem support is in scope
- [ ] Expose ECRIS query as MCP tool via FastMCP wrapping SOAP

## References

- Repo: https://github.com/sibies/Just.Net
- Last activity: 2021-12-05
- Upstream SOAP: http://portalquery.just.ro/query.asmx
- Last manual verification: 2026-05-27
