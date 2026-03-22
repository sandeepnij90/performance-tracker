import { NextRequest, NextResponse } from "next/server";
import {
  createJournalEntry,
  getAllJournalEntries,
  getJournalEntryByDate,
} from "../../../lib/db";
import { toMidnightUTC } from "../../../lib/dates";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  const session = await auth();
  const userId = session!.user!.id!;

  try {
    const month = request.nextUrl.searchParams.get("month") ?? undefined;

    if (month && !/^\d{4}-\d{2}$/.test(month)) {
      return NextResponse.json(
        { error: "Invalid month format. Use YYYY-MM" },
        { status: 400 },
      );
    }

    const entries = await getAllJournalEntries(userId, month);
    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch journal entries" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();
  const userId = session!.user!.id!;

  try {
    const body = await request.json();

    if (!body.successVision || typeof body.successVision !== "string" || !body.successVision.trim()) {
      return NextResponse.json(
        { error: "successVision is required" },
        { status: 400 },
      );
    }

    let entryDate: Date | undefined;
    if (body.date) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(body.date)) {
        return NextResponse.json(
          { error: "Invalid date format. Use YYYY-MM-DD" },
          { status: 400 },
        );
      }
      entryDate = toMidnightUTC(new Date(body.date + "T00:00:00Z"));
      const today = toMidnightUTC(new Date());
      if (entryDate > today) {
        return NextResponse.json(
          { error: "Cannot create entries for future dates" },
          { status: 400 },
        );
      }
      const existing = await getJournalEntryByDate(userId, entryDate);
      if (existing) {
        return NextResponse.json(
          { error: "A journal entry already exists for this date" },
          { status: 409 },
        );
      }
    }

    const entry = await createJournalEntry(
      userId,
      { successVision: body.successVision.trim() },
      entryDate,
    );
    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error("Error creating journal entry:", error);
    return NextResponse.json(
      { error: "Failed to create journal entry" },
      { status: 500 },
    );
  }
}
