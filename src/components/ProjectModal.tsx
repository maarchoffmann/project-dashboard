"use client";

import { useState, useEffect } from "react";
import type { Project, ProjectInsert, ProjectStatus } from "@/lib/types";

const STATUSES: ProjectStatus[] = ["Aktiv", "In Entwicklung", "Pausiert", "Archiviert"];
const CATEGORIES = ["Agentur-Tool", "Event-Tool", "Produktivität", "Analyse", "Sonstiges"];

interface Props {
  project: Project | null; // null = new project
  open: boolean;
  onClose: () => void;
  onSave: (data: ProjectInsert) => void;
}

const emptyForm: ProjectInsert = {
  name: "",
  description: "",
  url: "",
  tech_stack: [],
  category: "",
  status: "In Entwicklung",
  cover_image: "",
};

export default function ProjectModal({ project, open, onClose, onSave }: Props) {
  const [form, setForm] = useState<ProjectInsert>(emptyForm);
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    if (project) {
      setForm({
        name: project.name,
        description: project.description || "",
        url: project.url || "",
        tech_stack: project.tech_stack,
        category: project.category || "",
        status: project.status,
        cover_image: project.cover_image || "",
      });
      setTechInput("");
    } else {
      setForm(emptyForm);
      setTechInput("");
    }
  }, [project, open]);

  if (!open) return null;

  const addTech = () => {
    const trimmed = techInput.trim();
    if (trimmed && !form.tech_stack.includes(trimmed)) {
      setForm({ ...form, tech_stack: [...form.tech_stack, trimmed] });
      setTechInput("");
    }
  };

  const removeTech = (tech: string) => {
    setForm({ ...form, tech_stack: form.tech_stack.filter((t) => t !== tech) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#111111] p-6 shadow-2xl">
        <h2 className="mb-5 text-xl font-semibold text-white">
          {project ? "Projekt bearbeiten" : "Neues Projekt"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-white/20"
              placeholder="Projektname"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Beschreibung</label>
            <textarea
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-white/20"
              placeholder="Kurze Beschreibung..."
            />
          </div>

          {/* URL */}
          <div>
            <label className="mb-1 block text-sm text-zinc-400">URL</label>
            <input
              type="url"
              value={form.url || ""}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-white/20"
              placeholder="https://..."
            />
          </div>

          {/* Category + Status row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm text-zinc-400">Kategorie</label>
              <select
                value={form.category || ""}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-white/20"
              >
                <option value="">Auswählen...</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-zinc-400">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as ProjectStatus })}
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-white/20"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Tech-Stack</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTech();
                  }
                }}
                className="flex-1 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-white/20"
                placeholder="Technologie eingeben + Enter"
              />
              <button
                type="button"
                onClick={addTech}
                className="rounded-lg bg-white/[0.08] px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/[0.12]"
              >
                +
              </button>
            </div>
            {form.tech_stack.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {form.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 rounded-md bg-white/[0.06] px-2 py-0.5 text-xs text-zinc-300"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTech(tech)}
                      className="ml-0.5 text-zinc-500 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Cover Image */}
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Cover-Bild URL</label>
            <input
              type="url"
              value={form.cover_image || ""}
              onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-white/20"
              placeholder="https://... (optional)"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
            >
              {project ? "Speichern" : "Erstellen"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
