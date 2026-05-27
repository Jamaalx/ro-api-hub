---
slug: bvb-arena-datafeed
title: BVB Arena DataFeed (Market Data)
category: finance
institution: Bursa de Valori București (BVB)
country: RO
status: gated
verified_at: 2026-05-27
auth: contract
protocol: SOAP
openapi_spec: false
sandbox_available: false
contract_required: true
pricing: enterprise
rate_limit: unknown
official_docs: https://www.bvb.ro/Services/DataVending/ForDataVendors
api_base_url: unknown (vendor-provisioned Arena Gateway)
last_known_version: "Arena Gateway protocol — current"
mandatory_for_business: false
---

# BVB Arena DataFeed

## Overview

BVB's commercial market-data distribution service for vendors and professional traders. Delivers real-time, delayed, and end-of-day data for all BVB-listed instruments through the proprietary Arena Gateway protocol. Access is **paid** via a data-vending contract negotiated directly with BVB; redistribution requires additional licensing.

## Endpoints

Vendor-provisioned. No public endpoint URL. Connection details are provided after contract signature.

## Authentication

Commercial contract + technical credentials issued by BVB. Typically TCP-level with proprietary handshake.

## Request example

Not applicable — proprietary protocol, no public examples.

## Response example

Not applicable.

## Existing SDKs / wrappers

| Lang | Tool | Status | Notes |
|------|------|--------|-------|
| Vendor | Data vendors (Bloomberg, Refinitiv, ICE, local fintechs) | active | Re-license to end clients |
| OSS | — | none | NDA + licensing prevents OSS |

## Testing approach

- [ ] No public testing — must sign contract
- [ ] Sandbox only for paying customers
- [x] For derived (delayed/EOD) snapshots: use BVB's public website CSV downloads on a delay

## Known issues / gotchas

- **Paywall** — incompatible with free OSS aggregator
- Redistribution licensing on top of access licensing
- Proprietary protocol — no incentive for BVB to expose REST/JSON
- Public website only offers delayed quotes; intraday/realtime requires this contract

## Tutorial seeds (for content pipeline)

- "BVB market data: public free sources vs. paid Arena DataFeed (what you can legally do for free)"
- "Building a BVB intraday widget with public delayed data"

## ro-api-hub integration plan

- [ ] Catalogue entry only — do NOT wrap (licensing)
- [ ] Document free alternatives (BVB website CSV) in the same catalogue page
- [ ] No MCP tool

## References

- Data vendors page: https://www.bvb.ro/Services/DataVending/ForDataVendors
- Last manual verification: 2026-05-27
