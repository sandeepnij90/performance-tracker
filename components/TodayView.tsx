"use client";

import { useState } from "react";
import EntryCard from "./EntryCard";
import CheckInForm from "./CheckInForm";

interface Entry {
  id: number;
  createdAt: string;
  mentalEnergy: number;
  mentalNote: string | null;
  physicalEnergy: number;
  physicalNote: string | null;
}

export default function TodayView(props: Entry) {
  const [currentEntry, setCurrentEntry] = useState(props);
  const [editing, setEditing] = useState(false);

  const handleSave = (updated: Entry) => {
    setCurrentEntry(updated);
    setEditing(false);
  };

  if (editing) {
    return (
      <CheckInForm
        initialEntry={currentEntry}
        onCancel={() => setEditing(false)}
        onSaved={handleSave}
      />
    );
  }

  return (
    <div className="space-y-4">
      <EntryCard
        mentalEnergy={currentEntry.mentalEnergy}
        mentalNote={currentEntry.mentalNote}
        physicalEnergy={currentEntry.physicalEnergy}
        physicalNote={currentEntry.physicalNote}
        createdAt={currentEntry.createdAt}
      />
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="w-full rounded-lg border border-foreground/10 py-3 text-sm font-medium transition-opacity hover:bg-foreground/5"
      >
        Edit
      </button>
    </div>
  );
}
