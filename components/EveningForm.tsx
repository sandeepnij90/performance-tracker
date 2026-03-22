"use client";

import { useState } from "react";
import EnergySelector from "./EnergySelector";
import { JournalEntry } from "@/lib/types";

interface EveningFormProps {
  entry: JournalEntry;
  onSaved?: (entry: JournalEntry) => void;
  onCancel?: () => void;
}

export default function EveningForm({
  entry,
  onSaved,
  onCancel,
}: EveningFormProps) {
  const [achieved, setAchieved] = useState<boolean | null>(entry.achieved);
  const [achievedNote, setAchievedNote] = useState(entry.achievedNote ?? "");
  const [performanceScore, setPerformanceScore] = useState<number | null>(
    entry.performanceScore,
  );
  const [improvementNote, setImprovementNote] = useState(
    entry.improvementNote ?? "",
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch(`/api/journal/${entry.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          achieved,
          achievedNote: achievedNote || null,
          performanceScore,
          improvementNote: improvementNote || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      if (onSaved) onSaved(data);
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const isEditing = entry.achieved !== null;
  const canSubmit =
    achieved !== null && performanceScore !== null && !submitting;

  function getButtonLabel() {
    if (submitting) return "Saving...";
    if (isEditing) return "Update";
    return "Complete evening review";
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground/70">
          Did I achieve that?
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setAchieved(true)}
            className={`rounded-lg px-6 py-2.5 text-sm font-medium transition-colors ${
              achieved === true
                ? "bg-foreground text-background"
                : "border border-foreground/10 hover:bg-foreground/5"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => setAchieved(false)}
            className={`rounded-lg px-6 py-2.5 text-sm font-medium transition-colors ${
              achieved === false
                ? "bg-foreground text-background"
                : "border border-foreground/10 hover:bg-foreground/5"
            }`}
          >
            No
          </button>
        </div>
        <textarea
          value={achievedNote}
          onChange={(e) => setAchievedNote(e.target.value)}
          placeholder="Add a note (optional)"
          rows={2}
          className="w-full rounded-lg border border-foreground/10 bg-transparent p-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground/70">
          Performance today
        </h3>
        <EnergySelector
          value={performanceScore}
          onChange={setPerformanceScore}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground/70">
          If not 10, what can I improve?
        </h3>
        <textarea
          value={improvementNote}
          onChange={(e) => setImprovementNote(e.target.value)}
          placeholder="What would get me closer to 10..."
          rows={2}
          className="w-full rounded-lg border border-foreground/10 bg-transparent p-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3">
        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-lg border border-foreground/10 py-3 font-medium transition-opacity hover:bg-foreground/5"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full rounded-lg bg-foreground py-3 text-background font-medium transition-opacity disabled:opacity-40"
        >
          {getButtonLabel()}
        </button>
      </div>
    </form>
  );
}
