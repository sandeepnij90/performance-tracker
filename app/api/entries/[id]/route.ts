import { NextRequest, NextResponse } from "next/server";
import { updateEntryById } from "../../../../lib/db";
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  const userId = session!.user!.id!;

  const { id: idParam } = await params;
  const id = parseInt(idParam, 10);
  if (isNaN(id)) {
    return NextResponse.json(
      { error: "Invalid entry ID" },
      { status: 400 },
    );
  }

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

    const entry = await updateEntryById(userId, id, {
      mentalEnergy: body.mentalEnergy,
      mentalNote: body.mentalNote || null,
      physicalEnergy: body.physicalEnergy,
      physicalNote: body.physicalNote || null,
    });

    return NextResponse.json(entry);
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as { code: string }).code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Entry not found" },
        { status: 404 },
      );
    }
    console.error("Error updating entry:", error);
    return NextResponse.json(
      { error: "Failed to update entry" },
      { status: 500 },
    );
  }
}
