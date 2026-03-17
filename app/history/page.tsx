import Link from "next/link";
import { getAllEntries } from "../../lib/db";

function scoreColor(score: number): string {
  if (score >= 8) return "text-emerald-600";
  if (score <= 3) return "text-red-500";
  return "text-foreground";
}

function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function HistoryPage() {
  const entries = await getAllEntries();

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">History</h1>
        <Link
          href="/"
          className="text-sm text-foreground/60 hover:text-foreground transition-colors"
        >
          &larr; Back
        </Link>
      </div>

      {entries.length === 0 ? (
        <p className="text-foreground/60">No entries yet.</p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-xl border border-foreground/10 p-5 space-y-3"
            >
              <p className="text-sm font-medium text-foreground/60">
                {formatDate(entry.createdAt)}
              </p>

              <div className="flex gap-8">
                <div>
                  <p className="text-xs text-foreground/50">Mental</p>
                  <p className={`text-2xl font-bold ${scoreColor(entry.mentalEnergy)}`}>
                    {entry.mentalEnergy}
                  </p>
                  {entry.mentalNote && (
                    <p className="mt-1 text-sm text-foreground/70">{entry.mentalNote}</p>
                  )}
                </div>

                <div>
                  <p className="text-xs text-foreground/50">Physical</p>
                  <p className={`text-2xl font-bold ${scoreColor(entry.physicalEnergy)}`}>
                    {entry.physicalEnergy}
                  </p>
                  {entry.physicalNote && (
                    <p className="mt-1 text-sm text-foreground/70">
                      {entry.physicalNote}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
