import { NextResponse } from "next/server";
import { getTodayJournalEntry } from "../../../../lib/db";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  const userId = session!.user!.id!;

  try {
    const entry = await getTodayJournalEntry(userId);
    return NextResponse.json(entry);
  } catch (error) {
    console.error("Error fetching today's journal entry:", error);
    return NextResponse.json(
      { error: "Failed to fetch today's journal entry" },
      { status: 500 },
    );
  }
}
