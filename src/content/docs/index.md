---
title: ro-api-hub
description: Biblioteca open-source comprehensive a tuturor API-urilor din România — chei, sandbox-uri, OpenAPI, SDK-uri, tutoriale și MCP wrappers, într-un singur loc.
template: splash
hero:
  tagline: Toate API-urile din România. Un singur loc. Open-source.
  actions:
    - text: Vezi catalogul complet
      link: /apis/
      icon: right-arrow
      variant: primary
    - text: GitHub
      link: https://github.com/Jamaalx/ro-api-hub
      icon: external
      variant: secondary
---

## De ce ro-api-hub?

Până acum, ca să integrezi API-uri românești trebuia să cauți prin 100 de PDF-uri ANAF, să întrebi pe forumuri unde e documentația BNR, să te lupți cu certificatele CNAS, sau să plătești agregatori comerciali închiși. **ro-api-hub** rezolvă asta: **124 de API-uri catalogate**, fiecare cu endpoint, autentificare, sample-uri de cod, SDK-uri existente, și wrapper MCP pentru AI agents.

## Ce găsești aici

Numărătoare după câmpul `status:` din cele 124 de fișe (verificate 2026-05-27):

- ✅ **91 API-uri active**
- 🔒 9 servicii gated (contract / cert / WAF) — cu instrucțiuni cum accesezi
- ⚠️ 10 servicii stale — marcate clar, cu alternative recomandate
- ❌ 13 servicii fără API public — cu pattern de scraping (Playwright/Camoufox) ca fallback
- 🚨 1 serviciu suspendat (RAR Auto Pass) — alte incidente (ex. URL ASF rupt) sunt notate pe fiecare fișă

## 27 categorii acoperite

Fiscal (ANAF) · Finance (BNR, ASF, BVB) · Registry (ONRC) · Statistics (INS) · Geo (ANCPI, ANM, ANAR) · Health (CNAS) · Transport (CNAIR, RAR, DRPCIV, CFR, ARR) · Justice (Portal Just, Monitorul Oficial) · Identity (ROeID, STS) · Gov (Ghișeul, e-Guvernare) · OpenData · Procurement (SEAP) · Elections (AEP) · Regulators · Banks PSD2 · Payments · Couriers · Telecom · Marketplaces · SMS · Invoicing · Maps · Jobs · Energy · Insurance · Aggregators · Community SDKs

## Pentru AI agents

Toate paginile sunt servite și ca **`/llms.txt`** și **`/llms-full.txt`**. În viitor: server **MCP** dedicat la `/mcp` care expune toate API-urile ca tools.

## Status proiect

**Faza 1 — Catalog (completă)**: toate 124 servicii documentate cu YAML frontmatter parsabil de agenți.

**Faza 2 — Implementare (în curs)**: OpenAPI 3.1 specs canonice + REST facades (BrasilAPI-style) + MCP server + tutoriale Node/Python/PHP/Go.
