"use client";

import { useState } from "react";
import EnergySelector from "./EnergySelector";
import EntryCard from "./EntryCard";

interface Entry {
  id: number;
  createdAt: string;
  mentalEnergy: number;
  mentalNote: string | null;
  physicalEnergy: number;
  physicalNote: string | null;
}

interface CheckInFormProps {
  initialEntry?: Entry;
  onCancel?: () => void;
  onSaved?: (entry: Entry) => void;
}

export default function CheckInForm({
  initialEntry,
  onCancel,
  onSaved,
}: CheckInFormProps) {
  const isEditing = Boolean(initialEntry);

  const [mentalEnergy, setMentalEnergy] = useState<number | null>(
    initialEntry?.mentalEnergy ?? null,
  );
  const [physicalEnergy, setPhysicalEnergy] = useState<number | null>(
    initialEntry?.physicalEnergy ?? null,
  );
  const [mentalNote, setMentalNote] = useState(initialEntry?.mentalNote ?? "");
  const [physicalNote, setPhysicalNote] = useState(
    initialEntry?.physicalNote ?? "",
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedEntry, setSubmittedEntry] = useState<Entry | null>(null);

  if (submittedEntry) {
    return <EntryCard {...submittedEntry} />;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const url = isEditing ? "/api/entries/today" : "/api/entries";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mentalEnergy,
          mentalNote: mentalNote || null,
          physicalEnergy,
          physicalNote: physicalNote || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      if (onSaved) {
        onSaved(data);
      } else {
        setSubmittedEntry(data);
      }
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const canSubmit =
    mentalEnergy !== null && physicalEnergy !== null && !submitting;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-lg font-medium">How is my mental energy?</h2>
        <EnergySelector value={mentalEnergy} onChange={setMentalEnergy} />
        <textarea
          value={mentalNote}
          onChange={(e) => setMentalNote(e.target.value)}
          placeholder="Add a note (optional)"
          rows={2}
          className="w-full rounded-lg border border-foreground/10 bg-transparent p-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20"
        />
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-medium">How is my physical energy?</h2>
        <EnergySelector value={physicalEnergy} onChange={setPhysicalEnergy} />
        <textarea
          value={physicalNote}
          onChange={(e) => setPhysicalNote(e.target.value)}
          placeholder="Add a note (optional)"
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
          {submitting
            ? "Saving..."
            : isEditing
              ? "Update energy"
              : "Log today\u2019s energy"}
        </button>
      </div>
    </form>
  );
}
