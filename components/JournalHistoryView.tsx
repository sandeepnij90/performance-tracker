"use client";

import { useState } from "react";
import JournalEntryCard from "./JournalEntryCard";
import JournalCalendarView from "./JournalCalendarView";
import JournalDayModal from "./JournalDayModal";
import { JournalEntry } from "@/lib/types";
import { formatEntryDate } from "@/lib/dates";

interface JournalHistoryViewProps {
  entries: JournalEntry[];
}

type ViewState = "list" | "calendar";

export default function JournalHistoryView({
  entries: initialEntries,
}: JournalHistoryViewProps) {
  const [view, setView] = useState<ViewState>("list");
  const [entries, setEntries] = useState(initialEntries);
  const [modalState, setModalState] = useState<{
    date: Date;
    entry: JournalEntry | null;
  } | null>(null);

  function handleDayClick(date: Date, entry: JournalEntry | null) {
    setModalState({ date, entry });
  }

  function closeModal() {
    setModalState(null);
  }

  function handleSaved(newEntry: JournalEntry) {
    setEntries((prev) => {
      const exists = prev.some((e) => e.id === newEntry.id);

      if (exists) {
        return prev.map((e) => (e.id === newEntry.id ? newEntry : e));
      }

      return [...prev, newEntry].sort((a, b) => b.date.localeCompare(a.date));
    });
    setModalState(null);
  }

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

      {view === "list" &&
        (entries.length === 0 ? (
          <p className="text-foreground/60">No journal entries yet.</p>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <JournalEntryCard
                key={entry.id}
                entry={entry}
                title={formatEntryDate(entry.date)}
              />
            ))}
          </div>
        ))}

      {view === "calendar" && (
        <JournalCalendarView entries={entries} onDayClick={handleDayClick} />
      )}

      {modalState && (
        <JournalDayModal
          date={modalState.date}
          entry={modalState.entry}
          onClose={closeModal}
          onSaved={handleSaved}
        />
      )}
    </>
  );
}
