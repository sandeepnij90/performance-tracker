"use client";

import { useEffect, useState } from "react";
import { JournalEntry } from "@/lib/types";
import { formatEntryDate } from "@/lib/dates";
import JournalEntryCard from "./JournalEntryCard";
import MorningForm from "./MorningForm";
import EveningForm from "./EveningForm";

interface JournalDayModalProps {
  date: Date;
  entry: JournalEntry | null;
  onClose: () => void;
  onSaved: (entry: JournalEntry) => void;
}

type Mode =
  | "view"
  | "edit-morning"
  | "edit-evening"
  | "create-morning"
  | "create-evening";

export default function JournalDayModal({
  date,
  entry: initialEntry,
  onClose,
  onSaved,
}: JournalDayModalProps) {
  const [mode, setMode] = useState<Mode>(
    initialEntry ? "view" : "create-morning",
  );
  const [entry, setEntry] = useState<JournalEntry | null>(initialEntry);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function handleMorningCreated(saved: JournalEntry) {
    setEntry(saved);
    setMode("create-evening");
  }

  function handleMorningEdited(saved: JournalEntry) {
    setEntry(saved);
    setMode("view");
  }

  function handleEveningCreated(saved: JournalEntry) {
    onSaved(saved);
  }

  function handleEveningEdited(saved: JournalEntry) {
    setEntry(saved);
    setMode("view");
  }

  function handleSkipEvening() {
    if (entry) onSaved(entry);
  }

  const hasEvening = entry?.achieved !== null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md max-h-[80vh] overflow-y-auto rounded-2xl border border-white/8 bg-[#161616] p-6"
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

        {mode === "create-morning" && (
          <MorningForm targetDate={date} onSaved={handleMorningCreated} />
        )}

        {mode === "create-evening" && entry && (
          <div className="space-y-4">
            <div>
              <p className="mb-1 text-xs text-white/45">Morning intention</p>
              <p className="whitespace-pre-line text-sm text-white/80">
                {entry.successVision}
              </p>
            </div>
            <div className="border-t border-white/8 pt-4">
              <EveningForm entry={entry} onSaved={handleEveningCreated} />
            </div>
            <button
              type="button"
              onClick={handleSkipEvening}
              className="w-full rounded-lg border border-foreground/10 py-3 text-sm font-medium transition-colors hover:bg-foreground/5"
            >
              Skip evening
            </button>
          </div>
        )}

        {mode === "view" && entry && (
          <div className="space-y-4">
            <JournalEntryCard entry={entry} />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setMode("edit-morning")}
                className="w-full rounded-lg border border-foreground/10 py-3 text-sm font-medium transition-colors hover:bg-foreground/5"
              >
                Edit morning
              </button>
              {hasEvening && (
                <button
                  type="button"
                  onClick={() => setMode("edit-evening")}
                  className="w-full rounded-lg border border-foreground/10 py-3 text-sm font-medium transition-colors hover:bg-foreground/5"
                >
                  Edit evening
                </button>
              )}
              {!hasEvening && (
                <button
                  type="button"
                  onClick={() => setMode("create-evening")}
                  className="w-full rounded-lg border border-foreground/10 py-3 text-sm font-medium transition-colors hover:bg-foreground/5"
                >
                  Add evening
                </button>
              )}
            </div>
          </div>
        )}

        {mode === "edit-morning" && entry && (
          <MorningForm
            initialEntry={entry}
            onCancel={() => setMode("view")}
            onSaved={handleMorningEdited}
          />
        )}

        {mode === "edit-evening" && entry && (
          <EveningForm
            entry={entry}
            onCancel={() => setMode("view")}
            onSaved={handleEveningEdited}
          />
        )}
      </div>
    </div>
  );
}
