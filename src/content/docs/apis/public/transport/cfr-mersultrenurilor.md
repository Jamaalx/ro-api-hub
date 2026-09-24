---
slug: cfr-mersultrenurilor
title: CFR Călători / InfoFer — Mersul Trenurilor
category: transport
institution: CFR Călători / InfoFer
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: unknown
official_docs: https://mersultrenurilor.infofer.ro/
api_base_url: https://mersultrenurilor.infofer.ro/
last_known_version: "n/a"
mandatory_for_business: false
---

# CFR Călători / InfoFer — Mersul Trenurilor

## Overview

InfoFer (CFR's IT subsidiary) operates the official train timetable and itinerary search for the Romanian railway network. The portal exposes an internal JSON API used by the SPA, returning train schedules, stops, transfers, and pricing. There is no published spec — the API is undocumented but stable enough that several community projects rely on it. Verified active 2026-05-27 with 1900+ trains in current schedule.

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `https://mersultrenurilor.infofer.ro/ro-RO` | Search UI |
| POST | `https://mersultrenurilor.infofer.ro/ro-RO/Itineraries` | Internal JSON search (undocumented) |
| GET | `https://mersultrenurilor.infofer.ro/ro-RO/Trains/{trainNumber}` | Train detail / stops |

## Authentication

None.

## Request example

```bash
curl -X POST 'https://mersultrenurilor.infofer.ro/ro-RO/Itineraries' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'User-Agent: Mozilla/5.0' \
  --data 'fromStationName=Bucuresti%20Nord&toStationName=Cluj%20Napoca&date=27.05.2026'
```

## Response example

```json
{
  "data": {
    "itineraries": [
      { "trains": [{"number": "IR1641", "departure": "08:15", "arrival": "16:45"}], "priceLei": 95.5 }
    ]
  }
}
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| — | various community scrapers | varies | Undocumented internal API; spec may change |

## Testing approach

- [x] Direct HTTP test (curl / fetch) — works with browser UA
- [x] Browser UA spoof recommended
- [ ] Sandbox available
- [ ] Local simulator

## Known issues / gotchas

- API is undocumented and internal — schema may break without notice.
- Some endpoints require anti-forgery tokens fetched from the HTML page first.
- Use a real browser User-Agent to avoid throttling.

## Tutorial seeds (for content pipeline)

- "Cum extragi mersul trenurilor CFR în Node.js (cu respect pentru ToS)"
- "Notificări de întârziere pentru trenuri folosind InfoFer + Telegram"

## ro-api-hub integration plan

- [ ] Catalogue entry
- [ ] Reverse-engineered OpenAPI 3.1 spec (best-effort)
- [ ] Thin wrapper with caching (Redis) to be a good citizen
- [ ] MCP tool exposed via FastMCP (search itineraries)
- [ ] Node/Python samples

## References

- Portal: https://mersultrenurilor.infofer.ro/
- CFR Călători: https://www.cfrcalatori.ro/
- Last manual verification: 2026-05-27
