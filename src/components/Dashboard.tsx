"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { Project, ProjectInsert } from "@/lib/types";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import DeleteConfirm from "./DeleteConfirm";

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("Alle");

  // Fetch projects
  const fetchProjects = useCallback(async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("updated_at", { ascending: false });

    if (!error && data) {
      setProjects(data as Project[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();

    // Realtime subscription
    const channel = supabase
      .channel("projects-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "projects" },
        () => {
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchProjects]);

  // Create or update project
  const handleSave = async (data: ProjectInsert) => {
    if (editingProject) {
      await supabase
        .from("projects")
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq("id", editingProject.id);
    } else {
      await supabase.from("projects").insert(data);
    }

    setModalOpen(false);
    setEditingProject(null);
    fetchProjects();
  };

  // Delete project
  const handleDelete = async () => {
    if (!deleteTarget) return;
    await supabase.from("projects").delete().eq("id", deleteTarget.id);
    setDeleteTarget(null);
    fetchProjects();
  };

  const openCreate = () => {
    setEditingProject(null);
    setModalOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const requestDelete = (id: string) => {
    const p = projects.find((proj) => proj.id === id);
    if (p) setDeleteTarget(p);
  };

  const statuses = ["Alle", "Aktiv", "In Entwicklung", "Pausiert", "Archiviert"];
  const filtered =
    filter === "Alle" ? projects : projects.filter((p) => p.status === filter);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-white">Projekte</h1>
            <p className="text-sm text-zinc-500">
              {projects.length} Projekt{projects.length !== 1 ? "e" : ""}
            </p>
          </div>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Neues Projekt
          </button>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="mx-auto max-w-6xl px-6 pt-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                filter === s
                  ? "bg-white text-black"
                  : "bg-white/[0.06] text-zinc-400 hover:bg-white/[0.1] hover:text-white"
              }`}
            >
              {s}
              {s !== "Alle" && (
                <span className="ml-1.5 text-[10px] opacity-60">
                  {projects.filter((p) => p.status === s).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <main className="mx-auto max-w-6xl px-6 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-white" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-3 rounded-full bg-white/[0.04] p-4">
              <svg className="h-8 w-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
              </svg>
            </div>
            <p className="text-sm text-zinc-500">Keine Projekte gefunden</p>
            <button
              onClick={openCreate}
              className="mt-3 text-sm text-white underline decoration-zinc-700 underline-offset-4 hover:decoration-white"
            >
              Erstes Projekt anlegen
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={openEdit}
                onDelete={requestDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <ProjectModal
        project={editingProject}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSave}
      />
      <DeleteConfirm
        open={!!deleteTarget}
        projectName={deleteTarget?.name || ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
