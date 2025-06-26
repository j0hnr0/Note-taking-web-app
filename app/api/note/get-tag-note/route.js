import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { getTagNotes } from "@/app/lib/note-service";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag");
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const notes = await getTagNotes({ userId, tag });

    return NextResponse.json(notes, { status: 200 });
  } catch (error) {

    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
    
  }
}
