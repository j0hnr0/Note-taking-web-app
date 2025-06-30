import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { searchAllNotes } from "@/app/lib/note-service";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    const isArchive = searchParams.get("archive") === "true";

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const notes = await searchAllNotes({ userId, query, isArchive });

    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    if (error.message === "User not Found") {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
