# ro-api-hub

[![Build](https://github.com/Jamaalx/ro-api-hub/actions/workflows/build.yml/badge.svg)](https://github.com/Jamaalx/ro-api-hub/actions/workflows/build.yml)

An open-source catalogue of Romanian APIs — public sector (ANAF, BNR, ONRC, CNAS, INS …) and private (PSD2 banks, couriers, payments, invoicing …). One Markdown file per service: endpoints, auth flow, how to get access, sandbox, request/response examples, existing SDKs and known gotchas, with a flat YAML frontmatter any script or agent can parse.

**Everything works straight from this repo** — there is no hosted site to depend on.

## What exists today

| | |
|---|---|
| **124 service files** | [`src/content/docs/apis/`](./src/content/docs/apis) — read them on GitHub, grep them, feed them to an LLM |
| **`catalog.json`** | one JSON index of all 124 services, committed at the repo root → [raw URL](https://raw.githubusercontent.com/Jamaalx/ro-api-hub/main/catalog.json) · [JSON Schema](./public/catalog.schema.json) |
| **Link checker** | [`scripts/check-apis.mjs`](./scripts/check-apis.mjs) — last run: [`reports/links-2026-09-24.md`](./reports/links-2026-09-24.md) |
| **Static site (optional)** | Astro Starlight: search, sidebar, `llms.txt`. Run it locally with `npm run dev`; not published anywhere yet |

**Not built yet (planned, no dates):** hosted MCP server, REST facades for scrape-only services, our own SDKs, canonical OpenAPI specs. The service files *link to* existing third-party SDKs and specs where they exist — that is all. If you read "MCP" in a service file, it refers to someone else's project.

## Using the catalogue

### catalog.json

```
https://raw.githubusercontent.com/Jamaalx/ro-api-hub/main/catalog.json
```

```js
const res = await fetch('https://raw.githubusercontent.com/Jamaalx/ro-api-hub/main/catalog.json');
const { services } = await res.json();

// Public, keyless APIs that are currently usable
const open = services.filter((s) => s.auth === 'none' && s.status === 'active');
console.log(open.map((s) => `${s.slug} — ${s.official_docs}`).join('\n'));

// Everything about one service, then read its full Markdown file
const vat = services.find((s) => s.slug === 'anaf-vat-v9');
const md = await (await fetch(vat.source_url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/'))).text();
```

Each entry has: `slug`, `name`, `category`, `sector` (public/private/aggregators/community), `institution`, `status`, `auth`, `protocol`, `sandbox_available`, `contract_required`, `openapi_spec`, `pricing`, `official_docs`, `api_base_url` (+ `api_base_url_note` when it is not a URL), `verified_at`, `links_checked_at`, `source_url` (the file on GitHub), `page_url` (null until the site is published).

`status` values: `active` usable · `stale` outdated, or its documented host is gone · `gated` needs a contract, certificate or partnership · `broken` no public API (the file documents a scraping fallback) · `suspended` service down.

Dates: **`verified_at`** is when someone actually exercised the API. **`links_checked_at`** only means the checker saw the documented URLs answer — the API itself was not tested.

### Example: ANAF VAT lookup (no key needed)

From [`anaf-vat-v9.md`](https://github.com/Jamaalx/ro-api-hub/blob/main/src/content/docs/apis/public/fiscal/anaf-vat-v9.md):

```bash
curl -X POST 'https://webservicesp.anaf.ro/PlatitorTvaRest/api/v9/ws/tva' \
  -H 'Content-Type: application/json' \
  -d '[{"cui": 43990858, "data": "2026-09-24"}]'
```

Up to 100 CUIs per call, ~1 req/s. The file lists the response shape, the SDKs that wrap it (PHP, TS, Go …) and the gotchas.

### Browse by category

| Sector | Category | Services | `active` |
|---|---|---:|---:|
| public | [Elections (AEP)](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/public/elections) | 1 | 1 |
| public | [Finance (BNR, ASF, BVB)](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/public/finance) | 8 | 5 |
| public | [Fiscal (ANAF)](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/public/fiscal) | 10 | 8 |
| public | [Geo / meteo (ANCPI, ANM, ANAR)](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/public/geo) | 9 | 6 |
| public | [Gov portals](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/public/gov) | 3 | 2 |
| public | [Health (CNAS)](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/public/health) | 4 | 4 |
| public | [Identity (ROeID, STS)](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/public/identity) | 3 | 2 |
| public | [Justice](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/public/justice) | 2 | 2 |
| public | [Open data](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/public/opendata) | 2 | 1 |
| public | [Procurement (SEAP)](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/public/procurement) | 2 | 2 |
| public | [Company registry (ONRC)](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/public/registry) | 2 | 0 |
| public | [Regulators / civic](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/public/regulators) | 7 | 4 |
| public | [Statistics (INS)](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/public/stats) | 2 | 2 |
| public | [Transport (CNAIR, RAR, DRPCIV, CFR)](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/public/transport) | 6 | 3 |
| private | [Banks — PSD2](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/private/banks) | 10 | 8 |
| private | [Couriers](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/private/couriers) | 6 | 6 |
| private | [Energy](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/private/energy) | 3 | 0 |
| private | [Insurance](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/private/insurance) | 2 | 1 |
| private | [Invoicing SaaS](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/private/invoicing) | 6 | 5 |
| private | [Jobs](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/private/jobs) | 3 | 1 |
| private | [Maps](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/private/maps) | 2 | 2 |
| private | [Marketplaces](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/private/marketplaces) | 3 | 2 |
| private | [Payments](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/private/payments) | 6 | 6 |
| private | [SMS](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/private/sms) | 1 | 1 |
| private | [Telecom](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/private/telecom) | 4 | 1 |
| — | [Aggregators](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/aggregators) | 8 | 6 |
| — | [Community SDKs / datasets](https://github.com/Jamaalx/ro-api-hub/tree/main/src/content/docs/apis/community) | 9 | 5 |

Status totals (from the frontmatter, after the 2026-09-24 link check): **86 active · 15 stale · 9 gated · 13 broken (no public API) · 1 suspended**. The full editorial index with notes per service is [`apis/index.md`](./src/content/docs/apis/index.md).

### For LLMs and agents

- Point the agent at `catalog.json` (raw URL above) and let it fetch the individual `source_url` files it needs.
- Or build the site (`npm run build`): `dist/llms.txt`, `dist/llms-full.txt`, `dist/llms-small.txt` and per-category bundles in `dist/_llms-txt/` (fiscal, finance, banks-psd2, couriers, all-public, all-private).
- Rules for AI contributors: [`AGENTS.md`](./AGENTS.md).

## Running things locally

Requires Node 22.12+.

```bash
npm install
npm run dev              # optional site at http://localhost:4321 (regenerates public/catalog.json first)
npm run build            # static site in dist/
npm run check:links      # after build: every internal link in dist/ must resolve
npm run catalog          # regenerate catalog.json after editing frontmatter — commit it
npm run check:catalog    # fails if the committed catalog.json is stale
npm run check:apis       # live link check -> reports/links-latest.md
```

### Link checker

`node scripts/check-apis.mjs [--write] [--report file.md] [--json file.json] [--only slug,slug]`

- Unauthenticated `HEAD`/`GET` only, 10 s timeout, max 4 requests in flight, max 1 request/second per host, User-Agent `ro-api-hub-checker (+https://github.com/Jamaalx/ro-api-hub)`.
- `official_docs` must answer 2xx/3xx; 401/403/418/429 are reported as "blocked — needs a human", not dead.
- `api_base_url` is only requested for `auth: none` services (any HTTP status proves the host is alive); for keyed APIs only the hostname is resolved, so no endpoint that needs credentials is ever called.
- Network failures are retried once, ≥30 s later. Exit code 1 if anything is dead.
- `--write` sets `links_checked_at` on fully-ok services and adds a dated note under "Known issues" for dead URLs; an `active` service whose host is gone becomes `stale`. Files are never deleted.

A weekly GitHub Actions run ([`check-apis.yml`](./.github/workflows/check-apis.yml)) opens an issue when links die.

### Publishing the site (optional)

The public URL lives in one place, [`site.config.mjs`](./site.config.mjs): `SITE_URL` env var, falling back to `https://jamaalx.github.io/ro-api-hub` (GitHub Pages, not enabled yet). A path in the URL becomes Astro's `base`, and canonical URLs, sitemap, `robots.txt`, `llms.txt` and `catalog.json` follow it:

```bash
SITE_URL=https://apis.example.org npm run build
```

`dist/` is plain static files — any static host works. A `Dockerfile` (nginx) is included for self-hosting.

## Contributing

Read [`AGENTS.md`](./AGENTS.md) and [`contributing.md`](./src/content/docs/contributing.md). To add a service:

1. Check it doesn't already exist: `grep -ri "<slug>" src/content/docs/apis/`
2. Copy [`templates/api-service.md`](./templates/api-service.md) to `src/content/docs/apis/{public|private}/{category}/{slug}.md` (or `apis/aggregators/`, `apis/community/`)
3. Fill in **all** frontmatter fields — `src/content.config.ts` validates them at build time; `unknown` is allowed, guessing is not
4. Body sections in order: Overview · Endpoints · Authentication · Request example · Response example · Existing SDKs · Testing approach · Known issues / gotchas · Tutorial seeds · ro-api-hub integration plan · References
5. Set `verified_at:` to the date you actually tested the API (leave `links_checked_at` to the checker)
6. `npm run catalog && npm run build` must pass; commit `catalog.json` with your change
7. Open a PR titled `add: {service name}` (or `fix: {service} — {what}` for corrections)

Found a dead link or a changed endpoint? A PR that fixes the URL (and removes the "Link check" note) is the most useful contribution there is.

Never fabricate endpoint URLs, version numbers or behaviour. No marketing copy.

## License

- **Code** (Astro site, scripts, config): [MIT](./LICENSE) — © 2026 Alex Mantello (ZED-ZEN)
- **Catalogue content** (the service files in `src/content/docs/` and `catalog.json`): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — attribute to "ro-api-hub" with a link to this repo

## Acknowledgements

Inspired by BrasilAPI, api.gouv.fr, APIs.guru, the llms.txt spec, the Model Context Protocol, and the Romanian developer community (Code for Romania, peviitor-ro, the ANAF API community, and everyone who wrote a thin ANAF/BNR wrapper over the years).
