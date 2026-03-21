"use client";

import { useMemo } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { EnergyEntry } from "@/lib/types";
import { toMidnightUTC } from "@/lib/dates";

interface CalendarViewProps {
  entries: EnergyEntry[];
  onDayClick: (date: Date, entry: EnergyEntry | null) => void;
}

export default function CalendarView({
  entries,
  onDayClick,
}: CalendarViewProps) {
  const entryMap = useMemo(() => {
    const map = new Map<string, EnergyEntry>();
    for (const entry of entries) {
      map.set(entry.date, entry);
    }
    return map;
  }, [entries]);

  const datesWithEntries = useMemo(
    () => entries.map((e) => new Date(e.date)),
    [entries],
  );

  function handleDayClick(date: Date) {
    const key = toMidnightUTC(date).toISOString();
    const entry = entryMap.get(key) ?? null;
    onDayClick(date, entry);
  }

  return (
    <DayPicker
      onDayClick={handleDayClick}
      modifiers={{ hasEntry: datesWithEntries }}
      modifiersClassNames={{
        hasEntry: "rdp-day-has-entry",
        today: "ring-1 ring-white/30 rounded-lg",
      }}
      classNames={{
        month_caption: "relative flex justify-center items-center mb-4",
        caption_label: "text-sm font-medium",
        nav: "absolute inset-x-0 top-0 flex justify-between",
        button_previous: "p-1 text-white/40 hover:text-white transition-colors",
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
