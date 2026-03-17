"use client";

const SCORES = [1, 2, 3, 4, 5, 6, 8, 9, 10];

interface EnergySelectorProps {
  value: number | null;
  onChange: (value: number) => void;
}

export default function EnergySelector({ value, onChange }: EnergySelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {SCORES.map((score) => (
        <button
          key={score}
          type="button"
          onClick={() => onChange(score)}
          className={`min-w-[44px] min-h-[44px] rounded-lg text-lg font-medium transition-colors
            ${
              value === score
                ? "bg-foreground text-background"
                : "bg-foreground/10 hover:bg-foreground/20"
            }`}
        >
          {score}
        </button>
      ))}
    </div>
  );
}
