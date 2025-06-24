import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { getUserTags } from "@/app/lib/note-service";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const tags = await getUserTags({ userId });

    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
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
