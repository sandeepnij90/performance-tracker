import { NextRequest, NextResponse } from "next/server";
import { createEntry, getAllEntries } from "../../../lib/db";

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
  try {
    const entries = await getAllEntries();
    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch entries" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    const entry = await createEntry({
      mentalEnergy: body.mentalEnergy,
      mentalNote: body.mentalNote || null,
      physicalEnergy: body.physicalEnergy,
      physicalNote: body.physicalNote || null,
    });
    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error("Error creating entry:", error);
    return NextResponse.json(
      { error: "Failed to create entry" },
      { status: 500 }
    );
  }
}
