import { createNote } from "@/app/lib/note-service";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId, title, content, tags } = await request.json();

    const note = await createNote({ userId, title, content, tags });

    return NextResponse.json(
      {
        message: "Note created successfully",
        note: {
          id: note.id,
          userId: note.userId,
          title: note.title,
          content: note.content,
          tags: note.tags,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Creating note error:", error);

    if (error.message === "User not Found") {
      return NextResponse.json(
        { message: "User cannot be found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
