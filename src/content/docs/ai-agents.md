---
title: Pentru AI agents
description: Cum să consumi ro-api-hub din ChatGPT, Claude, Cursor, Windsurf sau orice MCP client.
---

ro-api-hub e proiectat să fie **AI-native**. Toate datele sunt expuse în formate ușor de parsat de LLM-uri.

## llms.txt

Toate paginile sunt agregate într-un singur fișier la **[`/llms.txt`](/llms.txt)** (index curatat) și **[`/llms-full.txt`](/llms-full.txt)** (conținut complet, optim pentru context window mare).

Există și seturi parțiale per categorie:
- `/llms-fiscal.txt` — doar ANAF (VAT, e-Factura, e-Transport, SAF-T, SPV)
- `/llms-finance.txt` — BNR, ASF, BVB
- `/llms-banks-psd2.txt` — toate cele 10 bănci PSD2
- `/llms-couriers.txt` — Sameday, FAN, Cargus, DPD, GLS, Innoship
- `/llms-public.txt` — toate API-urile public-sector
- `/llms-private.txt` — toate API-urile private-sector

## MCP server (în curând)

Va fi disponibil la **`https://ro-api-hub.dev/mcp`** ca remote MCP server (HTTP+SSE). Va expune tools:

- `search_apis(query, category?)` — caută API-uri după keyword + filtru
- `get_api(slug)` — detalii complete despre un API
- `list_by_status(status)` — listă filtrată după status (active/stale/etc)
- `get_endpoints(slug)` — doar endpoint-urile unui API
- `get_sdks(slug)` — SDK-urile existente

## Cum îl folosești în Cursor / Claude Desktop

```jsonc
{
  "mcpServers": {
    "ro-api-hub": {
      "url": "https://ro-api-hub.dev/mcp"
    }
  }
}
```

## Cum îl folosești în ChatGPT / Claude.ai (fără MCP)

Copy-paste URL-ul **`https://ro-api-hub.dev/llms-full.txt`** într-un prompt sau folosește citation:

> Use the context at https://ro-api-hub.dev/llms-full.txt to answer questions about Romanian APIs.

## Crawlere AI

`robots.txt` permite crawlere AI legitime (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended) — vrem să fim indexați.

`ai.txt` declară opt-in pentru TDM (Text & Data Mining) sub Art. 4 EU Copyright Directive — folosește datele liber pentru training, RAG, inference.
