---
slug: portal-just-ecris
title: Portal Just — ECRIS Dosare (SOAP)
category: justice
institution: Ministerul Justiției (MJ)
country: RO
status: active
verified_at: 2026-05-27
auth: none
protocol: SOAP
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: unknown
official_docs: https://portal.just.ro/SitePages/dosare.aspx
api_base_url: http://portalquery.just.ro/query.asmx
last_known_version: "n/a"
mandatory_for_business: false
---

# Portal Just — ECRIS Dosare (SOAP)

## Overview

Portal.just.ro (ECRIS) is the public face of Romania's court case management system. It exposes a SOAP web service at `portalquery.just.ro/query.asmx` that allows querying cases (dosare) by number, parties, court, and date. This is the canonical programmatic entry point for legal-tech in Romania (used by lawyers, due diligence firms, and bankruptcy monitors). The WSDL is publicly available; no auth is required, but rate-respect is expected.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `http://portalquery.just.ro/query.asmx?WSDL` | WSDL definition |
| POST | `http://portalquery.just.ro/query.asmx` | SOAP endpoint — CautareDosare, CautareSedinte etc. |
| GET | `https://portal.just.ro/SitePages/dosare.aspx` | Web search UI |

## Authentication

None.

## Request example

```bash
curl -X POST 'http://portalquery.just.ro/query.asmx' \
  -H 'Content-Type: text/xml; charset=utf-8' \
  -H 'SOAPAction: "portalquery.just.ro/CautareDosare"' \
  -d '<?xml version="1.0"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
 <soap:Body>
  <CautareDosare xmlns="portalquery.just.ro">
   <numarDosar>1234/2024</numarDosar>
  </CautareDosare>
 </soap:Body>
</soap:Envelope>'
```

## Response example

```xml
<DosarRezultat>
  <NumarDosar>1234/2024</NumarDosar>
  <Instanta>Tribunalul București</Instanta>
  <Parti>...</Parti>
  <Stadiu>...</Stadiu>
</DosarRezultat>
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| .NET | `sibies/Just.Net` | stale (2021) | 7 commits, no releases |
| — | various aggregators | varies | incorpo.ro MCP includes MJ queries |

## Testing approach

- [x] Direct HTTP test (curl / fetch)
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- `portal.just.ro` HTTPS has TLS cert issues (some clients fail validation) — the SOAP endpoint is HTTP, so no TLS pain there.
- SOAP responses are verbose; consider XML→JSON normalization in your wrapper.
- Undocumented rate behaviour — back off aggressively to avoid IP blocks.
- Diacritics: ensure UTF-8 throughout (XML declaration + headers).

## Tutorial seeds (for content pipeline)

- "Interogarea ECRIS din Node.js: SOAP fără efort"
- "Monitorizare dosare comerciale: webhook când se schimbă stadiul"
- "Caching SOAP ECRIS cu Redis — strategie de invalidare"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] OpenAPI 3.1 spec (REST facade over SOAP)
- [ ] Thin REST wrapper translating SOAP → JSON
- [ ] MCP tool: `search_court_case`, `get_hearings`
- [ ] Node/Python/PHP samples

## References

- Web search: https://portal.just.ro/SitePages/dosare.aspx
- WSDL: http://portalquery.just.ro/query.asmx?WSDL
- Stale SDK: https://github.com/sibies/Just.Net
- Last manual verification: 2026-05-27
