"use client";

import { useEffect } from "react";
import { EnergyEntry } from "@/lib/types";
import { formatEntryDate } from "@/lib/dates";

interface DayModalProps {
  date: Date;
  entry: EnergyEntry | null;
  onClose: () => void;
  onSaved: (entry: EnergyEntry) => void;
}

export default function DayModal({ date, onClose }: DayModalProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-white/8 bg-[#161616] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wider text-white/40">
            {formatEntryDate(date)}
          </h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Phase 4 will add content here */}
      </div>
    </div>
  );
}
