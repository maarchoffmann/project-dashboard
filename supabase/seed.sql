-- Seed: Initiale Projekte
INSERT INTO projects (name, description, url, tech_stack, category, status) VALUES
(
  'Website Auditor',
  'Lokale Web-App die veraltete Websites findet und analysiert. Crawlt Seiten, prüft Technologien und generiert Audit-Reports.',
  'http://localhost:5001',
  ARRAY['Python', 'Flask', 'SQLite'],
  'Agentur-Tool',
  'Aktiv'
),
(
  'FLOWSTATE',
  'Projektmanagement-Tool mit Fokus-Features und Zeiterfassung. Hilft beim konzentrierten Arbeiten mit Pomodoro-Timer und Task-Tracking.',
  'http://localhost:5173',
  ARRAY['React 19', 'TypeScript', 'Supabase', 'Vite'],
  'Produktivität',
  'Aktiv'
),
(
  'Barplanung HF26',
  'Bar- und Getränkeplanung für Himmelfahrt 2026. Übersicht über Mengen, Kosten und Zuständigkeiten.',
  'http://localhost:5002',
  ARRAY['HTML', 'CSS', 'JavaScript'],
  'Event-Tool',
  'Aktiv'
),
(
  'HF26 Planung',
  'Event-Planungs-Dashboard für Himmelfahrt 2026. Koordination von Aufgaben, Teilnehmern und Zeitplänen.',
  'http://localhost:3000',
  ARRAY['Next.js 16', 'React 19', 'TypeScript'],
  'Event-Tool',
  'Aktiv'
);
