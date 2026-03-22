import Link from "next/link";
import { getTodayJournalEntry } from "../../lib/db";
import { auth } from "@/auth";
import JournalTodayView from "../../components/JournalTodayView";

export default async function JournalPage() {
  const session = await auth();
  const userId = session!.user!.id!;
  const todayEntry = await getTodayJournalEntry(userId);

  const serialized = todayEntry
    ? {
        id: todayEntry.id,
        date: todayEntry.date.toISOString(),
        createdAt: todayEntry.createdAt.toISOString(),
        successVision: todayEntry.successVision,
        achieved: todayEntry.achieved,
        achievedNote: todayEntry.achievedNote,
        performanceScore: todayEntry.performanceScore,
        improvementNote: todayEntry.improvementNote,
      }
    : null;

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold">Daily Journal</h1>

      <JournalTodayView initialEntry={serialized} />

      <Link
        href="/journal/history"
        className="mt-8 block text-center text-sm text-foreground/60 hover:text-foreground transition-colors"
      >
        View history &rarr;
      </Link>
    </main>
  );
}
