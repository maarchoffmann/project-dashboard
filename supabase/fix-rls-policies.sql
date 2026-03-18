-- ============================================
-- FIX: RLS Policies for anonymous public access
-- Run this in the Supabase SQL Editor if the
-- dashboard shows empty or returns 403/401 errors.
-- ============================================

-- Step 1: Drop existing policies
DROP POLICY IF EXISTS "Allow all access" ON projects;
DROP POLICY IF EXISTS "Allow anon select" ON projects;
DROP POLICY IF EXISTS "Allow anon insert" ON projects;
DROP POLICY IF EXISTS "Allow anon update" ON projects;
DROP POLICY IF EXISTS "Allow anon delete" ON projects;
DROP POLICY IF EXISTS "Allow authenticated select" ON projects;
DROP POLICY IF EXISTS "Allow authenticated insert" ON projects;
DROP POLICY IF EXISTS "Allow authenticated update" ON projects;
DROP POLICY IF EXISTS "Allow authenticated delete" ON projects;

-- Step 2: Ensure RLS is enabled
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Step 3: Create explicit policies for anon role
CREATE POLICY "Allow anon select" ON projects
  FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anon insert" ON projects
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anon update" ON projects
  FOR UPDATE TO anon USING (true) WITH CHECK (true);

CREATE POLICY "Allow anon delete" ON projects
  FOR DELETE TO anon USING (true);

-- Step 4: Create policies for authenticated role
CREATE POLICY "Allow authenticated select" ON projects
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert" ON projects
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON projects
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete" ON projects
  FOR DELETE TO authenticated USING (true);

-- Step 5: Verify
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies WHERE tablename = 'projects';
