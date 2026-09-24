---
title: ro-api-hub
description: Catalog open-source al API-urilor din România — endpoint-uri, autentificare, cum obții acces, sandbox-uri, exemple, SDK-uri existente și capcane, câte o fișă per serviciu.
template: splash
hero:
  tagline: Toate API-urile din România. Un singur loc. Open-source.
  actions:
    - text: Vezi catalogul complet
      link: apis/
      icon: right-arrow
      variant: primary
    - text: GitHub
      link: https://github.com/Jamaalx/ro-api-hub
      icon: external
      variant: secondary
---

## De ce ro-api-hub?

Până acum, ca să integrezi API-uri românești trebuia să cauți prin 100 de PDF-uri ANAF, să întrebi pe forumuri unde e documentația BNR, să te lupți cu certificatele CNAS, sau să plătești agregatori comerciali închiși. **ro-api-hub** rezolvă asta: **125 de API-uri catalogate**, fiecare cu endpoint, autentificare, sample-uri de cod, SDK-uri existente și capcane cunoscute — plus un `catalog.json` cu toate, direct din repo.

## Ce găsești aici

Numărătoare după câmpul `status:` din cele 125 de fișe (după verificarea linkurilor din 2026-09-24):

- ✅ **86 API-uri active**
- 🔒 8 servicii gated (contract / cert / WAF) — cu instrucțiuni cum accesezi
- ⚠️ 11 servicii stale — marcate clar, cu alternative recomandate unde există
- ❌ 13 servicii fără API public — cu pattern de scraping (Playwright/Camoufox) ca fallback
- 🚨 7 servicii suspendate sau dispărute (RAR Auto Pass, Geoportal și MyEterra ANCPI după atacul ransomware, e-guvernare.ro înlocuit de ROePAS, CivicHQ, PSD2 OTP și Alpha Bank după fuziuni) — detalii pe fiecare fișă
