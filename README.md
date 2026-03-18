# Projekt-Dashboard

Ein modernes Dark-Mode Dashboard zur Verwaltung aller Projekte. Gebaut mit Next.js, Supabase und Tailwind CSS.

## Features

- Projekt-Karten mit Status, Tech-Stack und Beschreibung
- CRUD: Projekte erstellen, bearbeiten und löschen
- Echtzeit-Updates via Supabase Realtime
- Filter nach Status
- Responsive Grid Layout (1-3 Spalten)
- Durchgehend dunkles Design

## Tech-Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend/DB:** Supabase (PostgreSQL + Realtime)
- **Deployment:** Vercel

## Setup

### 1. Supabase-Projekt erstellen

1. Gehe zu [supabase.com](https://supabase.com) und erstelle ein neues Projekt
2. Offne den **SQL Editor** im Dashboard
3. Fuehre `supabase/migration.sql` aus (erstellt die `projects` Tabelle)
4. Fuehre `supabase/seed.sql` aus (fuegt die 4 initialen Projekte ein)

### 2. Umgebungsvariablen setzen

Kopiere `.env.example` zu `.env.local` und trage deine Supabase-Werte ein:

```bash
cp .env.example .env.local
```

Die Werte findest du unter: Supabase Dashboard > Settings > API

### 3. Lokal starten

```bash
npm install
npm run dev
```

Offne [http://localhost:3000](http://localhost:3000).

### 4. Auf Vercel deployen

1. Pushe das Repo zu GitHub
2. Importiere es auf [vercel.com](https://vercel.com)
3. Fuege die Environment Variables hinzu (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
4. Deploy

## Projektstruktur

```
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    Dashboard.tsx        # Hauptkomponente mit State und CRUD
    ProjectCard.tsx      # Einzelne Projektkarte
    ProjectModal.tsx     # Modal zum Erstellen/Bearbeiten
    DeleteConfirm.tsx    # Loesch-Bestaetigung
    StatusBadge.tsx      # Status-Anzeige
  lib/
    supabase.ts          # Supabase Client
    types.ts             # TypeScript Types
supabase/
  migration.sql          # Tabellen-Schema
  seed.sql               # Initiale Projektdaten
```
