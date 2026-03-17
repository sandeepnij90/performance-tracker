interface EntryCardProps {
  mentalEnergy: number;
  mentalNote: string | null;
  physicalEnergy: number;
  physicalNote: string | null;
  createdAt: Date | string;
}

export default function EntryCard({
  mentalEnergy,
  mentalNote,
  physicalEnergy,
  physicalNote,
}: EntryCardProps) {
  return (
    <div className="space-y-6 rounded-xl border border-foreground/10 p-6">
      <h2 className="text-xl font-semibold">Today&apos;s energy logged</h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-foreground/60">Mental energy</p>
          <p className="text-3xl font-bold">{mentalEnergy}</p>
          {mentalNote && (
            <p className="mt-1 text-sm text-foreground/70">{mentalNote}</p>
          )}
        </div>

        <div>
          <p className="text-sm text-foreground/60">Physical energy</p>
          <p className="text-3xl font-bold">{physicalEnergy}</p>
          {physicalNote && (
            <p className="mt-1 text-sm text-foreground/70">{physicalNote}</p>
          )}
        </div>
      </div>
    </div>
  );
}
