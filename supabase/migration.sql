-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  url TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  category TEXT,
  status TEXT DEFAULT 'In Entwicklung' CHECK (status IN ('Aktiv', 'In Entwicklung', 'Pausiert', 'Archiviert')),
  cover_image TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Enable Row Level Security (optional – open access for now)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow all operations (adjust for auth later)
CREATE POLICY "Allow all access" ON projects
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE projects;
