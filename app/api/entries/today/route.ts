import { NextResponse } from "next/server";
import { getTodayEntry } from "../../../../lib/db";

export async function GET() {
  try {
    const entry = await getTodayEntry();
    return NextResponse.json(entry);
  } catch (error) {
    console.error("Error fetching today's entry:", error);
    return NextResponse.json(
      { error: "Failed to fetch today's entry" },
      { status: 500 }
    );
  }
}
