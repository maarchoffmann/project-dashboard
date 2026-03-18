"use client";

interface Props {
  open: boolean;
  projectName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirm({ open, projectName, onConfirm, onCancel }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-sm rounded-2xl border border-white/[0.08] bg-[#111111] p-6 shadow-2xl">
        <h3 className="mb-2 text-lg font-semibold text-white">Projekt löschen?</h3>
        <p className="mb-5 text-sm text-zinc-400">
          Bist du sicher, dass du <strong className="text-white">{projectName}</strong> löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            Abbrechen
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-500/20 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/30"
          >
            Löschen
          </button>
        </div>
      </div>
    </div>
  );
}
