import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";
import { updatePassword } from "@/app/lib/user-service";

export async function PATCH(request) {
  try {
    const { oldPassword, newPassword } = await request.json();

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const result = await updatePassword({ userId, oldPassword, newPassword });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error.message === "User not found") {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }

    if (error.message === "Invalid old password") {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
