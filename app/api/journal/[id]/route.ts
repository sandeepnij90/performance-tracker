import { NextRequest, NextResponse } from "next/server";
import { updateJournalEntryById } from "../../../../lib/db";
import { auth } from "@/auth";

const VALID_SCORES = [1, 2, 3, 4, 5, 6, 8, 9, 10];

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

    if ("successVision" in body) {
      if (!body.successVision || typeof body.successVision !== "string" || !body.successVision.trim()) {
        return NextResponse.json(
          { error: "successVision must be a non-empty string" },
          { status: 400 },
        );
      }
      body.successVision = body.successVision.trim();
    }

    if ("performanceScore" in body && body.performanceScore !== null) {
      if (!Number.isInteger(body.performanceScore) || !VALID_SCORES.includes(body.performanceScore)) {
        return NextResponse.json(
          { error: "performanceScore must be between 1–10 (7 is not allowed)" },
          { status: 400 },
        );
      }
    }

    const data: Record<string, unknown> = {};
    if ("successVision" in body) data.successVision = body.successVision;
    if ("achieved" in body) data.achieved = body.achieved;
    if ("achievedNote" in body) data.achievedNote = body.achievedNote;
    if ("performanceScore" in body) data.performanceScore = body.performanceScore;
    if ("improvementNote" in body) data.improvementNote = body.improvementNote;

    const entry = await updateJournalEntryById(userId, id, data);
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
    console.error("Error updating journal entry:", error);
    return NextResponse.json(
      { error: "Failed to update journal entry" },
      { status: 500 },
    );
  }
}
