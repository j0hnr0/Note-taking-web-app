import { getUserNotesById } from "@/app/lib/note-service";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Note not found" }, { status: 400 });
    }

    const note = await getUserNotesById({ id });

    return NextResponse.json(note, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
