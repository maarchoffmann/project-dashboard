export type ProjectStatus = "Aktiv" | "In Entwicklung" | "Pausiert" | "Archiviert";

export interface Project {
  id: string;
  name: string;
  description: string | null;
  url: string | null;
  tech_stack: string[];
  category: string | null;
  status: ProjectStatus;
  cover_image: string | null;
  created_at: string;
  updated_at: string;
}

export type ProjectInsert = Omit<Project, "id" | "created_at" | "updated_at">;
export type ProjectUpdate = Partial<ProjectInsert>;
