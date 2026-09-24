---
slug: bvb-arenaxt
title: BVB ArenaXT Trading API
category: finance
institution: Bursa de Valori București (BVB)
country: RO
status: gated
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: contract
protocol: SOAP
openapi_spec: false
sandbox_available: false
contract_required: true
pricing: enterprise
rate_limit: unknown
official_docs: https://www.bvb.ro/Services/Connectivity/BrokerageSystem/ArenaXTAPI
api_base_url: unknown (broker-provisioned)
last_known_version: "Arena Gateway v3.1.3 (PDF dated 2019-06-24)"
mandatory_for_business: false
---

# BVB ArenaXT Trading API

## Overview

BVB's order-routing and trading connectivity for member brokers and licensed institutions. ArenaXT is the trading engine; the API (InvestDirect ArenaAPI) lets brokers' OMS connect, send orders, receive executions, and query market state. Access is restricted to BVB member brokerages — end-users trade through their broker.

The publicly downloadable Arena Gateway protocol specification is **v3.1.3, dated 2019-06-24** (verified 2026-05-27); newer revisions are distributed only to members under NDA.

## Endpoints

Broker-provisioned. No public endpoint URL. Connection over proprietary protocol on dedicated network.

## Authentication

BVB membership + technical credentials. NDA covers protocol details.

## Request example

Not applicable — proprietary protocol.

## Response example

Not applicable.

## Existing SDKs / wrappers

| Lang | Tool | Status | Notes |
|------|------|--------|-------|
| Vendor | Member-broker OMS providers | active | In-house or vendor-supplied integrations |
| OSS | — | none | NDA prevents OSS |

## Testing approach

- [ ] No public sandbox — must be a BVB member broker
- [ ] Test environments are broker-internal
- [x] For research / public surface, use the BVB website's order-book snapshots (delayed)

## Known issues / gotchas

- **Paywall + membership** — fully closed ecosystem
- Public protocol PDF is **stale (2019-06-24, v3.1.3)** — current revisions only via members
- Not relevant for typical SaaS or retail use-cases — only meaningful if building a brokerage
- Confused frequently with the DataFeed (market data only) — these are separate contracts

## Tutorial seeds (for content pipeline)

- "How a Romanian brokerage connects to BVB ArenaXT — architectural overview"
- "Public vs. private BVB APIs: what you can build without member access"

## ro-api-hub integration plan

- [ ] Catalogue entry only — `gated` status
- [ ] Do NOT wrap or implement
- [ ] Cross-reference with `bvb-arena-datafeed` for related licensing context

## References

- Landing page: https://www.bvb.ro/Services/Connectivity/BrokerageSystem/ArenaXTAPI
- Protocol PDF (v3.1.3, 2019-06-24, public excerpt): linked from the landing page
- Last manual verification: 2026-05-27
