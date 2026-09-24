// Single source of truth for the public URL of the (optional) static site.
// Used by astro.config.mjs (`site` + `base` -> canonical URLs, sitemap, llms.txt),
// src/pages/robots.txt.ts, the ai-agents page and scripts/build-catalog.mjs.
//
// Override at build time:  SITE_URL=https://example.org npm run build
// The default targets GitHub Pages for this repo (not enabled yet). If the URL
// has a path (e.g. /ro-api-hub), it becomes Astro's `base` automatically.
export const DEFAULT_SITE_URL = 'https://jamaalx.github.io/ro-api-hub';

export const SITE_URL = (process.env.SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '');

const { origin, pathname } = new URL(SITE_URL);
/** Origin only, for Astro's `site`. */
export const SITE_ORIGIN = origin;
/** Path prefix ('' or '/ro-api-hub'), for Astro's `base`. */
export const BASE_PATH = pathname.replace(/\/+$/, '');

export const REPO_URL = 'https://github.com/Jamaalx/ro-api-hub';
export const REPO_BLOB = `${REPO_URL}/blob/main`;
export const RAW_CATALOG_URL = 'https://raw.githubusercontent.com/Jamaalx/ro-api-hub/main/catalog.json';
