import { NextRequest, NextResponse } from "next/server";
import { getTodayEntry, updateTodayEntry } from "../../../../../lib/db";
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

export async function GET() {
  const session = await auth();
  const userId = session!.user!.id!;

  try {
    const entry = await getTodayEntry(userId);
    return NextResponse.json(entry);
  } catch (error) {
    console.error("Error fetching today's entry:", error);
    return NextResponse.json(
      { error: "Failed to fetch today's entry" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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

    const entry = await updateTodayEntry(userId, {
      mentalEnergy: body.mentalEnergy,
      mentalNote: body.mentalNote || null,
      physicalEnergy: body.physicalEnergy,
      physicalNote: body.physicalNote || null,
    });

    if (!entry) {
      return NextResponse.json(
        { error: "No entry exists for today" },
        { status: 404 }
      );
    }

    return NextResponse.json(entry);
  } catch (error) {
    console.error("Error updating today's entry:", error);
    return NextResponse.json(
      { error: "Failed to update entry" },
      { status: 500 }
    );
  }
}
