import Link from "next/link";
import { getAllEntries } from "../../lib/db";
import EntryCard from "../../components/EntryCard";

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
          {entries.map(({ id, createdAt, mentalEnergy, mentalNote, physicalEnergy, physicalNote }) => (
            <EntryCard
              key={id}
              title={formatDate(createdAt)}
              mentalEnergy={mentalEnergy}
              mentalNote={mentalNote}
              physicalEnergy={physicalEnergy}
              physicalNote={physicalNote}
              createdAt={createdAt}
            />
          ))}
        </div>
      )}
    </main>
  );
}
