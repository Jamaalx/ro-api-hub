# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); the site is not versioned,
so entries are grouped by date.

## 2026-09-24

### Added
- `catalog.json` at the repo root (and `/catalog.json` on the site): machine-readable index of all 124 services, with `catalog.schema.json`. Regenerate with `npm run catalog`.
- `scripts/check-apis.mjs`: polite live link check (unauthenticated HEAD/GET, 4 in flight, 1 req/s per host). First run: [`reports/links-2026-09-24.md`](./reports/links-2026-09-24.md). New optional frontmatter field `links_checked_at` (separate from `verified_at`).
- `scripts/check-dist-links.mjs`, weekly `check-apis.yml` workflow (opens an issue on dead links), `Dockerfile` + `nginx.conf` for self-hosting the static site.

### Changed
- Link check results: 98 services all-ok (`links_checked_at: 2026-09-24`); 5 active services whose documented host is gone are now `stale` (86 active / 15 stale / 9 gated / 13 broken / 1 suspended); dead URLs are noted under "Known issues" in each file.
- The public URL is configurable in one place (`site.config.mjs`, `SITE_URL`); default is a future GitHub Pages URL. `ro-api-hub.dev` (never registered) is gone.
- README rewritten around using the repo directly: `catalog.json` raw URL, category table, what exists vs. what is only planned (MCP, REST facades, SDKs).

### Fixed
- Catalogue (`/apis/`): all 124 rows linked to `…/<slug>.md` paths that 404'd; they now link to the real `/<slug>/` pages.
- `/_llms-txt/*.txt` category bundles (fiscal, finance, banks-psd2, couriers, all-public, all-private) were empty — the directory globs never matched the flat page slugs. They now contain the pages of each category.
- Every page referenced a missing `/favicon.svg`; added one.
- Home page status counts now match the `status:` frontmatter.
- `ai-agents` page pointed to non-existent `/llms-<category>.txt` files and a `/mcp` endpoint that does not exist.

### Changed
- Dependencies: `astro` 7.3.5, `@astrojs/starlight` 0.41.11 (in-range updates; `npm audit` clean).
- CI sanity check fails the build if a category bundle is nearly empty or the favicon is missing.

## 2026-08-30

### Changed
- Upgraded to Astro 7 / Starlight 0.41 / sharp 0.35 / starlight-llms-txt 0.11; `npm audit fix` for transitive packages.
- Added MIT `LICENSE` (code) and CC BY 4.0 note (catalogue content), weekly scheduled CI build, Dependabot.
- README counts verified against `src/content`; expanded Contributing section.

## 2026-05-27

### Added
- Initial catalogue: 124 Romanian API services across 27 categories, Astro Starlight site, `llms.txt` output.
