"use client";

import { useState } from "react";
import { JournalEntry } from "@/lib/types";
import { formatShortDate } from "@/lib/dates";

interface MorningFormProps {
  initialEntry?: JournalEntry;
  targetDate?: Date;
  onCancel?: () => void;
  onSaved?: (entry: JournalEntry) => void;
}

export default function MorningForm({
  initialEntry,
  targetDate,
  onCancel,
  onSaved,
}: MorningFormProps) {
  const [successVision, setSuccessVision] = useState(
    initialEntry?.successVision ?? "",
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const url = initialEntry
      ? `/api/journal/${initialEntry.id}`
      : "/api/journal";
    const method = initialEntry ? "PUT" : "POST";

    const body: Record<string, unknown> = {
      successVision: successVision.trim(),
    };

    if (targetDate && !initialEntry) {
      body.date = [
        targetDate.getUTCFullYear(),
        String(targetDate.getUTCMonth() + 1).padStart(2, "0"),
        String(targetDate.getUTCDate()).padStart(2, "0"),
      ].join("-");
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
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

  function getButtonLabel() {
    if (submitting) return "Saving...";
    if (initialEntry) return "Update";
    if (targetDate) return `Log intention for ${formatShortDate(targetDate)}`;
    return "Set today\u2019s intention";
  }

  const canSubmit = successVision.trim().length > 0 && !submitting;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground/70">
          What would success look like today?
        </h3>
        <textarea
          value={successVision}
          onChange={(e) => setSuccessVision(e.target.value)}
          placeholder="Describe what a successful day looks like..."
          rows={3}
          className="w-full rounded-lg border border-foreground/10 bg-transparent p-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3">
        {initialEntry && onCancel && (
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
