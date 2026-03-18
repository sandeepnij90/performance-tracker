import Link from "next/link";
import { getAllEntries } from "../../lib/db";
import { auth } from "@/auth";
import HistoryView from "../../components/HistoryView";

export default async function HistoryPage() {
  const session = await auth();
  const userId = session!.user!.id!;
  const rawEntries = await getAllEntries(userId);

  const entries = rawEntries.map((entry) => ({
    id: entry.id,
    date: entry.date.toISOString(),
    createdAt: entry.createdAt.toISOString(),
    mentalEnergy: entry.mentalEnergy,
    mentalNote: entry.mentalNote,
    physicalEnergy: entry.physicalEnergy,
    physicalNote: entry.physicalNote,
  }));

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

      <HistoryView entries={entries} />
    </main>
  );
}
