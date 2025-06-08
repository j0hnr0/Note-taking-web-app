import { createNote } from "@/app/lib/note-service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request) {
  try {
    const { title, content, tags } = await request.json();

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

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
