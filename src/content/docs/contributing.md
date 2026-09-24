---
title: Cum contribui
description: Adaugă un API nou, corectează unul existent, scrie un tutorial sau un SDK wrapper.
---

ro-api-hub e un proiect community-owned. Orice contribuție e binevenită — de la corecții de o linie până la SDK-uri întregi.

## Adaugă un API nou

1. Fork repo-ul de pe [GitHub](https://github.com/Jamaalx/ro-api-hub)
2. Copiază `templates/api-service.md` într-un fișier nou în `src/content/docs/apis/{public|private|aggregators|community}/{categorie}/`
3. Completează toate câmpurile din YAML frontmatter (vezi schema în `src/content.config.ts`)
4. Adaugă cel puțin: Overview, Endpoints, Authentication, un Request example funcțional, Known issues
5. Setează `verified_at: YYYY-MM-DD` cu data la care ai testat efectiv API-ul
   (`links_checked_at` e altceva: îl scrie `node scripts/check-apis.mjs --write` când linkurile răspund — nu înseamnă că API-ul a fost testat)
6. PR cu titlu `add: {nume serviciu}`

## Corectează unul existent

1. Găsește fișierul în `src/content/docs/apis/`
2. Editează, actualizează `verified_at`
3. PR cu titlu `fix: {nume serviciu} — {ce ai corectat}`

## Scrie un tutorial

Fiecare serviciu are o secțiune "Tutorial seeds" cu idei. Take any seed → write the tutorial → drop the file in `src/content/docs/tutorials/{slug}/`.

## Scrie un SDK / wrapper

Dacă wrappi un API într-o librărie publicabilă (npm/pypi/packagist/etc), adaugă-l în secțiunea "Existing SDKs" a fișierului serviciului respectiv. Bonus: scrie un mini-tutorial care arată cum se folosește.

## Pentru AI agents

Repo-ul include un `AGENTS.md` la rădăcină cu instrucțiuni specifice pentru OpenAI Codex, Cursor, Claude Code etc.

## Cod de conduită

Fii respectuos. Nu introduce reclame ascunse pentru servicii comerciale (mențiunile sunt OK dacă servesc reader-ul, nu sunt OK dacă sunt promoționale).
