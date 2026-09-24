---
slug: stripe-ro
title: Stripe Romania
category: payments
institution: Stripe, Inc.
country: RO
status: active
verified_at: 2026-05-27
links_checked_at: 2026-09-24
auth: api_key
protocol: REST/JSON
openapi_spec: true
sandbox_available: true
contract_required: false
pricing: pay_as_you_go
rate_limit: "100 read / 100 write req/s (default account limit)"
official_docs: https://docs.stripe.com/
api_base_url: https://api.stripe.com
last_known_version: "2025-09-30.acacia"
mandatory_for_business: false
---

# Stripe Romania

## Overview

Stripe is fully available in Romania for both card acceptance and Stripe Connect payouts in RON/EUR. Klarna is supported in RO with a fee of **4.99% + 1.50 RON** per successful charge. Test mode is built into every Stripe account (no separate sandbox provisioning).

## Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `https://api.stripe.com/v1/payment_intents` | Create PaymentIntent |
| POST | `https://api.stripe.com/v1/checkout/sessions` | Hosted Checkout |
| POST | `https://api.stripe.com/v1/customers` | Create customer |
| POST | `https://api.stripe.com/v1/subscriptions` | Recurring billing |
| POST | webhook endpoint (merchant-hosted) | Event delivery |

## Authentication

API key (`sk_test_...` / `sk_live_...`) sent as HTTP Basic username. Per-request signed webhooks via `Stripe-Signature` header.

## Request example

```bash
curl -X POST 'https://api.stripe.com/v1/payment_intents' \
  -u sk_test_xxx: \
  -d amount=2000 \
  -d currency=ron \
  -d 'payment_method_types[]=card' \
  -d 'payment_method_types[]=klarna'
```

## Response example

```json
{ "id": "pi_...", "client_secret": "pi_..._secret_...", "status": "requires_payment_method" }
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| Node | `stripe` | official | |
| Python | `stripe` | official | |
| PHP | `stripe/stripe-php` | official | |
| Go | `stripe-go` | official | |
| Ruby | `stripe` | official | |
| .NET | `Stripe.net` | official | |
| Java | `stripe-java` | official | |

## Testing approach

- [x] Test mode built-in (no separate sandbox)
- [x] Stripe CLI for local webhook forwarding (`stripe listen`)
- [ ] Test card numbers in docs (4242...)

## Known issues / gotchas

- Romanian VAT (TVA 19%) must be configured via Stripe Tax or manually
- Klarna RO: 4.99% + 1.50 RON per successful charge (verify in current pricing page before quoting clients)
- ANAF e-Factura **not** generated automatically — needs separate integration
- 3DS2 strong customer authentication enforced for EEA cards
- API version pinning required for stable behavior across upgrades

## Tutorial seeds

- "Stripe + ANAF e-Factura: bridging the gap for RO merchants"
- "Adding Klarna to a RO Stripe Checkout"
- "Stripe Tax for Romanian TVA"
- "Stripe Connect payouts in RON"

## ro-api-hub integration plan

- [ ] Catalogue entry (link out to official; no mirror needed)
- [ ] MCP tool wrapping common RO flows (PI + Klarna + e-Factura bridge)
- [ ] Samples in PHP/Node/Python tailored to RO compliance

## References

- Official: https://docs.stripe.com/
- Klarna RO pricing: https://stripe.com/ro/pricing
- API versioning: https://docs.stripe.com/api/versioning
- Last manual verification: 2026-05-27
