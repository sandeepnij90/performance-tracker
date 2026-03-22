"use client";

import { useState } from "react";
import MorningForm from "./MorningForm";
import EveningForm from "./EveningForm";
import { JournalEntry } from "@/lib/types";

interface JournalTodayViewProps {
  initialEntry: JournalEntry | null;
}

type EditingSection = null | "morning" | "evening";

export default function JournalTodayView({
  initialEntry,
}: JournalTodayViewProps) {
  const [entry, setEntry] = useState<JournalEntry | null>(initialEntry);
  const [editing, setEditing] = useState<EditingSection>(null);

  function handleMorningSaved(saved: JournalEntry) {
    setEntry(saved);
    setEditing(null);
  }

  function handleEveningSaved(saved: JournalEntry) {
    setEntry(saved);
    setEditing(null);
  }

  // No entry yet — show morning form
  if (!entry) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-white/8 bg-[#161616] px-6 py-5">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-wider text-white/40">
            Morning
          </p>
          <MorningForm onSaved={handleMorningSaved} />
        </div>

        <div className="rounded-2xl border border-white/8 bg-[#161616] px-6 py-5">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-white/40">
            Evening
          </p>
          <p className="text-sm text-foreground/40">
            Complete your morning entry first
          </p>
        </div>
      </div>
    );
  }

  const hasEvening = entry.achieved !== null;

  // Editing morning
  if (editing === "morning") {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-white/8 bg-[#161616] px-6 py-5">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-wider text-white/40">
            Morning
          </p>
          <MorningForm
            initialEntry={entry}
            onCancel={() => setEditing(null)}
            onSaved={handleMorningSaved}
          />
        </div>
      </div>
    );
  }

  // Editing evening
  if (editing === "evening" && entry) {
    return (
      <div className="space-y-6">
        {/* Morning read-only */}
        <div className="rounded-2xl border border-white/8 bg-[#161616] px-6 py-5">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-white/40">
            Morning
          </p>
          <p className="text-sm text-white/80">
            &ldquo;{entry.successVision}&rdquo;
          </p>
        </div>

        {/* Evening edit form */}
        <div className="rounded-2xl border border-white/8 bg-[#161616] px-6 py-5">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-wider text-white/40">
            Evening
          </p>
          <EveningForm
            entry={entry}
            onCancel={() => setEditing(null)}
            onSaved={handleEveningSaved}
          />
        </div>
      </div>
    );
  }

  // Morning done, evening not yet
  if (!hasEvening) {
    return (
      <div className="space-y-6">
        {/* Morning read-only with edit */}
        <div className="rounded-2xl border border-white/8 bg-[#161616] px-6 py-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-medium uppercase tracking-wider text-white/40">
              Morning
            </p>
            <button
              type="button"
              onClick={() => setEditing("morning")}
              className="text-xs text-foreground/50 hover:text-foreground transition-colors"
            >
              Edit
            </button>
          </div>
          <p className="text-sm text-white/80">
            &ldquo;{entry.successVision}&rdquo;
          </p>
        </div>

        {/* Evening form */}
        <div className="rounded-2xl border border-white/8 bg-[#161616] px-6 py-5">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-wider text-white/40">
            Evening
          </p>
          <EveningForm entry={entry} onSaved={handleEveningSaved} />
        </div>
      </div>
    );
  }

  // Fully completed — read-only with edit buttons
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/8 bg-[#161616] px-6 py-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-wider text-white/40">
            Morning
          </p>
          <button
            type="button"
            onClick={() => setEditing("morning")}
            className="text-xs text-foreground/50 hover:text-foreground transition-colors"
          >
            Edit
          </button>
        </div>
        <p className="text-sm text-white/80">
          &ldquo;{entry.successVision}&rdquo;
        </p>
      </div>

      <div className="rounded-2xl border border-white/8 bg-[#161616] px-6 py-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-wider text-white/40">
            Evening
          </p>
          <button
            type="button"
            onClick={() => setEditing("evening")}
            className="text-xs text-foreground/50 hover:text-foreground transition-colors"
          >
            Edit
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <p className="mb-1 text-xs text-white/45">Did I achieve that?</p>
            <p className="text-sm text-white/80">
              {entry.achieved ? "\u2713 Yes" : "\u2717 No"}
            </p>
            {entry.achievedNote && (
              <p className="mt-1 text-[13px] text-white/45">
                &ldquo;{entry.achievedNote}&rdquo;
              </p>
            )}
          </div>

          {entry.performanceScore && (
            <div>
              <p className="mb-1 text-xs text-white/45">Performance</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-medium text-white">
                  {entry.performanceScore}
                </span>
                <span className="text-[13px] text-white/30">/ 10</span>
              </div>
              <div className="mt-1 h-1 w-20 overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-[#3B82F6] transition-[width] duration-400 ease-out"
                  style={{
                    width: `${(entry.performanceScore / 10) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {entry.improvementNote && (
            <div>
              <p className="mb-1 text-xs text-white/45">To improve</p>
              <p className="text-[13px] text-white/45">
                &ldquo;{entry.improvementNote}&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
