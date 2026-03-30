"use client";

import { useMemo } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { JournalEntry } from "@/lib/types";
interface JournalCalendarViewProps {
  entries: JournalEntry[];
  onDayClick: (date: Date, entry: JournalEntry | null) => void;
}

export default function JournalCalendarView({
  entries,
  onDayClick,
}: JournalCalendarViewProps) {
  const entryMap = useMemo(() => {
    const map = new Map<string, JournalEntry>();
    for (const entry of entries) {
      map.set(entry.date, entry);
    }
    return map;
  }, [entries]);

  const completeDates = useMemo(
    () =>
      entries
        .filter((e) => e.achieved !== null)
        .map((e) => new Date(e.date)),
    [entries],
  );

  const partialDates = useMemo(
    () =>
      entries
        .filter((e) => e.achieved === null)
        .map((e) => new Date(e.date)),
    [entries],
  );

  function handleDayClick(date: Date) {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    const entry = entryMap.get(utcDate.toISOString()) ?? null;
    onDayClick(utcDate, entry);
  }

  return (
    <DayPicker
      onDayClick={handleDayClick}
      modifiers={{
        journalComplete: completeDates,
        journalPartial: partialDates,
      }}
      modifiersClassNames={{
        journalComplete: "rdp-day-journal-complete",
        journalPartial: "rdp-day-journal-partial",
        today: "ring-1 ring-white/30 rounded-lg",
      }}
      classNames={{
        month_caption: "relative flex justify-center items-center mb-4",
        caption_label: "text-sm font-medium",
        nav: "absolute inset-x-0 top-0 flex justify-between",
        button_previous:
          "p-1 text-white/40 hover:text-white transition-colors",
        button_next: "p-1 text-white/40 hover:text-white transition-colors",
        weekday: "text-white/30 text-xs font-medium w-9 text-center pb-2",
        day: "w-9 h-9 text-center",
        day_button:
          "w-full h-full rounded-lg text-sm hover:bg-white/8 transition-colors",
        outside: "text-white/20",
        disabled: "text-white/15 cursor-not-allowed",
        selected: "bg-white/10 rounded-lg",
      }}
      disabled={{ after: new Date() }}
      endMonth={new Date()}
      fixedWeeks
      showOutsideDays
      weekStartsOn={1}
    />
  );
}
