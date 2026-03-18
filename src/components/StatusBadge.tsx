"use client";

import type { ProjectStatus } from "@/lib/types";

const statusColors: Record<ProjectStatus, string> = {
  Aktiv: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "In Entwicklung": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Pausiert: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  Archiviert: "bg-red-500/15 text-red-400 border-red-500/30",
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[status]}`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
