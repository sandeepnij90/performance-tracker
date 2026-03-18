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
      modifiersClassNames={{ hasEntry: "rdp-day-has-entry" }}
      disabled={{ after: new Date() }}
      endMonth={new Date()}
      fixedWeeks
      showOutsideDays
      weekStartsOn={1}
    />
  );
}
