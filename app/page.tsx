import Link from "next/link";
import { getTodayEntry } from "../lib/db";
import CheckInForm from "../components/CheckInForm";
import EntryCard from "../components/EntryCard";

export default async function Home() {
  const todayEntry = await getTodayEntry();

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold">Energy Tracker</h1>
      {todayEntry ? <EntryCard {...todayEntry} /> : <CheckInForm />}

      <Link
        href="/history"
        className="mt-8 block text-center text-sm text-foreground/60 hover:text-foreground transition-colors"
      >
        View history &rarr;
      </Link>
    </main>
  );
}
