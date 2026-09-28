# SMISI-212

Outil web pour aider les PME marocaines (offshoring / BPO, ESN, éditeurs SaaS) à structurer une mise en conformité **ISO 27001:2022**, avec un pont indicatif vers la **DNSSI**.

Conçu pour un DSI ou RSSI naissant (30–100 salariés, Casa / Rabat) qui doit viser une certification en 12–18 mois, sans RSSI à temps plein.

## Modules

1. **Auto-diagnostic** — 93 mesures de l’Annexe A, réponses Conforme / Partiel / Non conforme / N/A
2. **Dashboard** — score global, radar par domaine, clichés avant/après
3. **Plan d’action** — priorisé (criticité × facilité), export PDF et CSV/Excel
4. **Bibliothèque** — explication en français simple, premier pas, modèles
5. **Pont DNSSI** — correspondance indicative par contrôle

## Stack

- Next.js (App Router) + Tailwind
- Recharts (radar)
- jsPDF (export)
- Données **locales** (`localStorage`) pour démarrer sans backend

Supabase (auth + Postgres) pourra arriver ensuite pour le multi-utilisateur.

## Démarrer

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Avertissement

Les intitulés et questions sont des formulations pédagogiques originales, pas le texte officiel ISO. Le mapping DNSSI est indicatif et doit être recoupé avec les documents DGSSI en vigueur. L’outil n’est pas un substitut à un audit de certification.
