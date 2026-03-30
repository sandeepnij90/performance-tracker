import Link from "next/link";
import { getAllJournalEntries } from "../../../lib/db";
import { auth } from "@/auth";
import JournalHistoryView from "../../../components/JournalHistoryView";

export default async function JournalHistoryPage() {
  const session = await auth();
  const userId = session!.user!.id!;
  const rawEntries = await getAllJournalEntries(userId);

  const entries = rawEntries.map((entry) => ({
    id: entry.id,
    date: entry.date.toISOString(),
    createdAt: entry.createdAt.toISOString(),
    successVision: entry.successVision,
    achieved: entry.achieved,
    achievedNote: entry.achievedNote,
    performanceScore: entry.performanceScore,
    improvementNote: entry.improvementNote,
  }));

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Journal History</h1>
        <Link
          href="/journal"
          className="text-sm text-foreground/60 hover:text-foreground transition-colors"
        >
          &larr; Back
        </Link>
      </div>

      <JournalHistoryView entries={entries} />
    </main>
  );
}
