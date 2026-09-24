# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); the site is not versioned,
so entries are grouped by date.

## 2026-09-24

### Fixed
- Catalogue (`/apis/`): all 124 rows linked to `…/<slug>.md` paths that 404'd; they now link to the real `/<slug>/` pages.
- `/_llms-txt/*.txt` category bundles (fiscal, finance, banks-psd2, couriers, all-public, all-private) were empty — the directory globs never matched the flat page slugs. They now contain the pages of each category.
- Every page referenced a missing `/favicon.svg`; added one.
- Home page status counts now match the `status:` frontmatter (91 active / 9 gated / 10 stale / 13 broken / 1 suspended).

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
