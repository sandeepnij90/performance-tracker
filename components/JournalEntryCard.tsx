import { JournalEntry } from "@/lib/types";

interface JournalEntryCardProps {
  entry: JournalEntry;
  title?: string;
}

export default function JournalEntryCard({
  entry,
  title,
}: JournalEntryCardProps) {
  const hasEvening = entry.achieved !== null;
  const percent = entry.performanceScore
    ? (entry.performanceScore / 10) * 100
    : 0;

  return (
    <div className="rounded-2xl border border-white/8 bg-[#161616] px-6 py-5">
      {title && (
        <p className="mb-4 text-[11px] font-medium uppercase tracking-wider text-white/40">
          {title}
        </p>
      )}

      <div className="space-y-4">
        {/* Morning section */}
        <div>
          <p className="mb-1 text-xs text-white/45">Morning intention</p>
          <p className="whitespace-pre-line text-sm text-white/80">
            {entry.successVision}
          </p>
        </div>

        {/* Evening section */}
        {hasEvening && (
          <div className="space-y-3 border-t border-white/8 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-xs text-white/45">Achieved</p>
                <p className="text-sm text-white/80">
                  {entry.achieved ? "\u2713 Yes" : "\u2717 No"}
                </p>
                {entry.achievedNote && (
                  <p className="mt-1 whitespace-pre-line text-[13px] text-white/45">
                    {entry.achievedNote}
                  </p>
                )}
              </div>

              {entry.performanceScore && (
                <div className="text-right">
                  <p className="mb-1 text-xs text-white/45">Performance</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-medium text-white">
                      {entry.performanceScore}
                    </span>
                    <span className="text-[13px] text-white/30">/ 10</span>
                  </div>
                  <div className="mt-1 h-1 w-20 overflow-hidden rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full bg-[#3B82F6] transition-[width] duration-400 ease-out"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {entry.improvementNote && (
              <div>
                <p className="mb-1 text-xs text-white/45">To improve</p>
                <p className="whitespace-pre-line text-[13px] text-white/45">
                  {entry.improvementNote}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
