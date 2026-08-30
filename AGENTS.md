# AGENTS.md

Briefing for AI coding agents (OpenAI Codex, Cursor, Claude Code, GitHub Copilot, etc.) working in this repo.

## What this repo is

`ro-api-hub` — the comprehensive open-source library of Romanian APIs (fiscal, finance, banks, couriers, health, transport, etc.). 124 services catalogued, one MD per service with structured YAML frontmatter, plus tutorials, OpenAPI specs, SDKs, and an MCP server.

Built with **Astro Starlight + starlight-llms-txt**.

## Common tasks

```bash
# Node 22.12+ required (Astro 7)
npm install     # install deps
npm run dev     # local dev server (http://localhost:4321)
npm run build   # production build → ./dist/
npm run preview # preview the production build locally
```

## Repo structure

```
ro-api-hub/
├── astro.config.mjs           ← Starlight config + sidebar + llms.txt plugin
├── src/
│   ├── content.config.ts      ← content collection schema (extends Starlight with our fields)
│   └── content/
│       └── docs/
│           ├── index.md       ← homepage (splash)
│           ├── contributing.md
│           ├── ai-agents.md
│           └── apis/          ← 124 per-service MDs across 27 categories
│               ├── index.md
│               ├── public/{fiscal,finance,...}/{slug}.md
│               ├── private/{banks,payments,...}/{slug}.md
│               ├── aggregators/{slug}.md
│               └── community/{slug}.md
├── public/                    ← static (robots.txt, ai.txt, favicons)
├── AGENTS.md                  ← this file
└── README.md
```

## Per-service MD schema

Every file in `src/content/docs/apis/**/*.md` must have this YAML frontmatter (validated by `src/content.config.ts`):

```yaml
---
slug: slug-kebab-case          # also the filename
title: "Human-readable Name"   # required by Starlight
category: fiscal | finance | banks | couriers | ...
institution: "Issuing body"
country: RO
status: active | stale | broken | suspended | gated
verified_at: 2026-05-27        # date you last verified
auth: none | api_key | oauth2 | mtls | qualified_cert | basic_auth | contract
protocol: REST/JSON | REST/XML | SOAP | OGC_WMS | OGC_WFS | ArcGIS_REST | OData | static_files
openapi_spec: true | partial | false
sandbox_available: true | false
contract_required: true | false
pricing: free | freemium | pay_as_you_go | subscription | enterprise | mandatory
rate_limit: "e.g. 1 req/s"     # or "unknown" or "none_documented"
official_docs: https://...
api_base_url: https://...      # or "unknown"
last_known_version: "v9"       # or "unknown"
mandatory_for_business: true | false
---
```

Body sections (in order): Overview · Endpoints · Authentication · Request example · Response example · Existing SDKs · Testing approach · Known issues / gotchas · Tutorial seeds · ro-api-hub integration plan · References.

## Hard rules

- **Never fabricate endpoint URLs, version numbers, or API behavior.** If you don't know, mark as `unknown` in frontmatter and explain in the body. Better an honest gap than a confident lie.
- **Always update `verified_at:`** when you change any factual claim about an API.
- **No emojis in MDs** unless explicitly used as status indicators (✅⚠️🔒❌🚨 — see `apis/index.md` legend).
- **No marketing copy.** Be terse and technical.
- **Don't break the Starlight build.** Run `npm run build` after non-trivial changes; if it fails, fix before commit.
- **Custom frontmatter fields are validated.** See `src/content.config.ts` for the Zod schema. Adding a field there requires updating both the schema and `templates/api-service.md`.

## When asked to "add an API"

1. Check it doesn't already exist (grep `src/content/docs/apis/` for the slug)
2. Pick the right category directory
3. Copy structure from a similar existing entry (e.g. `apis/public/fiscal/anaf-vat-v9.md`)
4. Fill all frontmatter — `unknown` is allowed but not preferred
5. Verify the docs URL actually loads
6. Run `npm run build` locally to confirm schema validation passes

## When asked to "verify a service"

1. WebFetch the `official_docs` URL → confirm it's alive
2. WebFetch the `api_base_url` (or a known sample endpoint) → confirm it responds
3. Note any deprecation banners or version bumps
4. Update `status`, `last_known_version`, `verified_at`

## Status keys cheat-sheet

- `active` — works in production, docs current
- `stale` — works but content is dated 2022 or older; deprecated version
- `broken` — no public API exists / 404 / suspended
- `suspended` — service temporarily down per official notice (e.g. RAR Auto Pass)
- `gated` — requires login / cert / contract / WAF prevents automated access

## Linked projects (out of scope here, but related)

- `C:\Users\alexd\ro-api-hub-research\` — original research output (consolidated catalogues + verification reports)
- See `templates/api-service.md` for the canonical per-service template
