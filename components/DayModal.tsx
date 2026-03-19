"use client";

import { useEffect, useState } from "react";
import { EnergyEntry } from "@/lib/types";
import { formatEntryDate } from "@/lib/dates";
import EntryCard from "./EntryCard";
import CheckInForm from "./CheckInForm";

interface DayModalProps {
  date: Date;
  entry: EnergyEntry | null;
  onClose: () => void;
  onSaved: (entry: EnergyEntry) => void;
}

type Mode = "view" | "edit" | "create";

export default function DayModal({
  date,
  entry,
  onClose,
  onSaved,
}: DayModalProps) {
  const [mode, setMode] = useState<Mode>(entry ? "view" : "create");

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-white/8 bg-[#161616] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wider text-white/40">
            {formatEntryDate(date)}
          </h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {mode === "view" && entry && (
          <div className="space-y-4">
            <EntryCard
              mentalEnergy={entry.mentalEnergy}
              mentalNote={entry.mentalNote}
              physicalEnergy={entry.physicalEnergy}
              physicalNote={entry.physicalNote}
              createdAt={entry.createdAt}
            />
            <button
              onClick={() => setMode("edit")}
              className="w-full rounded-lg border border-foreground/10 py-3 text-sm font-medium transition-colors hover:bg-foreground/5"
            >
              Edit entry
            </button>
          </div>
        )}

        {mode === "edit" && entry && (
          <CheckInForm
            initialEntry={entry}
            onCancel={() => setMode("view")}
            onSaved={onSaved}
          />
        )}

        {mode === "create" && (
          <CheckInForm targetDate={date} onSaved={onSaved} />
        )}
      </div>
    </div>
  );
}
