import { NextRequest, NextResponse } from "next/server";
import { createEntry, getAllEntries, getEntryByDate } from "../../../lib/db";
import { toMidnightUTC } from "../../../lib/dates";
import { auth } from "@/auth";

const VALID_SCORES = [1, 2, 3, 4, 5, 6, 8, 9, 10];

function validateScore(value: unknown, field: string): string | null {
  if (value === undefined || value === null) {
    return `${field} is required`;
  }
  if (!Number.isInteger(value)) {
    return `${field} must be an integer`;
  }
  if (!VALID_SCORES.includes(value as number)) {
    return `${field} must be between 1–10 (7 is not allowed)`;
  }
  return null;
}

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

    const entries = await getAllEntries(userId, month);
    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch entries" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();
  const userId = session!.user!.id!;

  try {
    const body = await request.json();

    const mentalError = validateScore(body.mentalEnergy, "mentalEnergy");
    if (mentalError) {
      return NextResponse.json({ error: mentalError }, { status: 400 });
    }

    const physicalError = validateScore(body.physicalEnergy, "physicalEnergy");
    if (physicalError) {
      return NextResponse.json({ error: physicalError }, { status: 400 });
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
      const existing = await getEntryByDate(userId, entryDate);
      if (existing) {
        return NextResponse.json(
          { error: "An entry already exists for this date" },
          { status: 409 },
        );
      }
    }

    const entry = await createEntry(
      userId,
      {
        mentalEnergy: body.mentalEnergy,
        mentalNote: body.mentalNote || null,
        physicalEnergy: body.physicalEnergy,
        physicalNote: body.physicalNote || null,
      },
      entryDate,
    );
    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error("Error creating entry:", error);
    return NextResponse.json(
      { error: "Failed to create entry" },
      { status: 500 },
    );
  }
}
