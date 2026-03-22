interface EntryCardProps {
  mentalEnergy: number;
  mentalNote: string | null;
  physicalEnergy: number;
  physicalNote: string | null;
  createdAt: Date | string;
  title?: string;
}

function EnergyItem({
  label,
  score,
  note,
  barColor,
}: {
  label: string;
  score: number;
  note: string | null;
  barColor: string;
}) {
  const percent = (score / 10) * 100;

  return (
    <div className="flex flex-col rounded-[10px] border border-white/6 bg-[#1e1e1e] p-4">
      <p className="mb-1.5 text-xs text-white/45">{label}</p>
      <div className="mb-2 flex items-baseline gap-1">
        <span className="text-4xl font-medium leading-none text-white">
          {score}
        </span>
        <span className="text-[13px] text-white/30">/ 10</span>
      </div>
      <div className="mb-2 h-1 overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full transition-[width] duration-400 ease-out"
          style={{ width: `${percent}%`, background: barColor }}
        />
      </div>
      <div className="grow">
        {note && <p className="whitespace-pre-line text-[13px] text-white/45">{note}</p>}
      </div>
    </div>
  );
}

export default function EntryCard({
  mentalEnergy,
  mentalNote,
  physicalEnergy,
  physicalNote,
  title = "Today\u2019s energy",
}: EntryCardProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#161616] px-6 py-5">
      <p className="mb-4 text-[11px] font-medium uppercase tracking-wider text-white/40">
        {title}
      </p>

      <div className="grid grid-cols-2 gap-3">
        <EnergyItem
          label="Mental energy"
          score={mentalEnergy}
          note={mentalNote}
          barColor="#7F77DD"
        />
        <EnergyItem
          label="Physical energy"
          score={physicalEnergy}
          note={physicalNote}
          barColor="#1D9E75"
        />
      </div>
    </div>
  );
}
