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

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow full public access for anon users (no auth required)
CREATE POLICY "Allow anon select" ON projects
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "Allow anon insert" ON projects
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon update" ON projects
  FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anon delete" ON projects
  FOR DELETE TO anon
  USING (true);

-- Also allow authenticated users (future-proofing)
CREATE POLICY "Allow authenticated select" ON projects
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert" ON projects
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON projects
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete" ON projects
  FOR DELETE TO authenticated
  USING (true);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE projects;
