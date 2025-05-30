import { updateUserNoteById } from "@/app/lib/note-service";
import { NextResponse } from "next/server";

export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const data = await request.json();

    if (!id) {
      return NextResponse.json({ message: "Note not found" }, { status: 400 });
    }

    const note = await updateUserNoteById({ id, data });

    return NextResponse.json(note, { status: 200 });
  } catch (error) {

    if (error.message === "Note not found") {
      return NextResponse.json(
        { message: "Note cannot be found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
