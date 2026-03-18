"use client";

import { useState } from "react";
import EntryCard from "./EntryCard";
import CalendarView from "./CalendarView";
import { EnergyEntry } from "@/lib/types";
import { formatEntryDate } from "@/lib/dates";

interface HistoryViewProps {
  entries: EnergyEntry[];
}

export default function HistoryView({ entries: initialEntries }: HistoryViewProps) {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [entries] = useState(initialEntries);

  return (
    <>
      <div className="mb-6 flex gap-2">
        <button
          type="button"
          onClick={() => setView("list")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            view === "list"
              ? "bg-foreground text-background"
              : "border border-foreground/10 hover:bg-foreground/5"
          }`}
        >
          List
        </button>
        <button
          type="button"
          onClick={() => setView("calendar")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            view === "calendar"
              ? "bg-foreground text-background"
              : "border border-foreground/10 hover:bg-foreground/5"
          }`}
        >
          Calendar
        </button>
      </div>

      {view === "list" && (
        entries.length === 0 ? (
          <p className="text-foreground/60">No entries yet.</p>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <EntryCard
                key={entry.id}
                title={formatEntryDate(entry.date)}
                mentalEnergy={entry.mentalEnergy}
                mentalNote={entry.mentalNote}
                physicalEnergy={entry.physicalEnergy}
                physicalNote={entry.physicalNote}
                createdAt={entry.createdAt}
              />
            ))}
          </div>
        )
      )}

      {view === "calendar" && (
        <CalendarView
          entries={entries}
          onDayClick={() => {}}
        />
      )}
    </>
  );
}
