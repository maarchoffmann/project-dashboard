-- Seed: Initiale Projekte
INSERT INTO projects (name, description, url, tech_stack, category, status) VALUES
(
  'Website Auditor',
  'Lokale Web-App die veraltete Websites findet und analysiert. Crawlt Seiten, prüft Technologien und generiert Audit-Reports.',
  NULL,
  ARRAY['Python', 'Flask', 'SQLite'],
  'Agentur-Tool',
  'Aktiv'
),
(
  'FLOWSTATE',
  'Projektmanagement-Tool mit Fokus-Features und Zeiterfassung. Hilft beim konzentrierten Arbeiten mit Pomodoro-Timer und Task-Tracking.',
  'https://flowstate.vercel.app',
  ARRAY['React 19', 'TypeScript', 'Supabase', 'Vite'],
  'Produktivität',
  'Aktiv'
),
(
  'Barplanung HF26',
  'Bar- und Getränkeplanung für Himmelfahrt 2026. Übersicht über Mengen, Kosten und Zuständigkeiten.',
  NULL,
  ARRAY['HTML', 'CSS', 'JavaScript'],
  'Event-Tool',
  'Aktiv'
),
(
  'HF26 Planung',
  'Event-Planungs-Dashboard für Himmelfahrt 2026. Koordination von Aufgaben, Teilnehmern und Zeitplänen.',
  NULL,
  ARRAY['Next.js 16', 'React 19', 'TypeScript'],
  'Event-Tool',
  'Aktiv'
);
