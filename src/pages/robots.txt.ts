import type { APIRoute } from 'astro';
import { SITE_URL } from '../../site.config.mjs';

// Generated so the Sitemap line follows SITE_URL (site.config.mjs).
const body = `# ro-api-hub — we want to be indexed by everyone, including AI crawlers.
# Documentation is meant to be consumed, both by humans and by LLM-powered tools.

User-agent: *
Allow: /

# AI crawlers — explicitly allowed
${['GPTBot', 'ClaudeBot', 'Claude-Web', 'CCBot', 'Google-Extended', 'Applebot-Extended', 'PerplexityBot', 'OAI-SearchBot', 'Claude-SearchBot']
  .map((ua) => `User-agent: ${ua}\nAllow: /\n`).join('\n')}
Sitemap: ${SITE_URL}/sitemap-index.xml
`;

export const GET: APIRoute = () => new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
