---
slug: itrack-anaf-packagist
title: itrack/anaf — PHP Package for ANAF VAT (Packagist)
category: community
institution: iTrack (open-source)
country: RO
status: active
verified_at: 2026-05-27
auth: none
protocol: REST/JSON
openapi_spec: false
sandbox_available: false
contract_required: false
pricing: free
rate_limit: "matches ANAF upstream (1 req/s, 100 CUI/req)"
official_docs: https://packagist.org/packages/itrack/anaf
api_base_url: https://webservicesp.anaf.ro/PlatitorTvaRest/api/v9/ws/tva (via SDK)
last_known_version: "v3.x (breaking vs v2)"
mandatory_for_business: false
---

# itrack/anaf

## Overview

Lightweight PHP package for ANAF VAT/CUI lookup (v9). Widely used in the Romanian PHP ecosystem (Packagist downloads). Recent major version brought breaking API changes (v2 → v3) — pin carefully. Narrower scope than `andalisolutions/anaf-php`: VAT lookup only, no e-Factura.

## Endpoints (covered)

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `https://webservicesp.anaf.ro/PlatitorTvaRest/api/v9/ws/tva` | VAT lookup (batched) |

## Authentication

None (ANAF v9 is public).

## Request example

```php
use ITrack\Anaf\Anaf;

$anaf = new Anaf();
$result = $anaf->getInfo('14399840', '2026-05-27');
```

## Response example

```json
{
  "cui": 14399840,
  "denumire": "DEDEMAN SRL",
  "scpTVA": true
}
```

## Existing SDKs / wrappers

| Lang | Package | Status | Notes |
|------|---------|--------|-------|
| PHP | `itrack/anaf` | active | This entry — VAT only |
| PHP | `andalisolutions/anaf-php` | active 2025-08 | Broader scope |

## Testing approach

- [x] Direct HTTP test against ANAF v9
- [ ] Playwright needed
- [ ] Browser UA spoof needed
- [ ] Sandbox: ANAF v9 is itself public
- [x] Local simulator: `aperta-sync/anaf-api-simulator`

## Known issues / gotchas

- **v2 vs v3 breaking changes** — pin `^3.0` deliberately or stay on `^2.0` for legacy apps
- ANAF v9 rate limit: 1 req/s, max 100 CUIs per request — batch aggressively
- Library does not handle ANAF v8 deprecation (already retired) — ensure you're on v3 which targets v9

## Tutorial seeds (for content pipeline)

- "Migrating itrack/anaf v2 → v3: what changed"
- "Batching 100 CUI lookups per request to stay under ANAF rate limits"
- "itrack/anaf vs andalisolutions/anaf-php for a small Laravel app"

## ro-api-hub integration plan

- [ ] Catalogue entry on docs site
- [ ] Use as reference impl for ANAF v9 batching pattern
- [ ] Mention in PHP install instructions as the minimum-viable option for VAT-only use cases
- [ ] Could fork/wrap as canonical SDK if maintainer becomes inactive

## References

- Packagist: https://packagist.org/packages/itrack/anaf
- Last manual verification: 2026-05-27
- **Missing data**: exact GitHub URL, license, maintainer roadmap
