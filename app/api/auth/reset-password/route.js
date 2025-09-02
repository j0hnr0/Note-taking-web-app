import { resetPasswordThroughLink } from "@/app/lib/user-service";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { token, newPassword } = await request.json();

    await resetPasswordThroughLink({ token, newPassword });

    return NextResponse.json(
      { message: "Password Reset Successfully!" },
      { status: 200 }
    );
  } catch (error) {
    if (error.message === "Invalid or expired token") {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    if (error.message === "Cannot reset password for this account type") {
      return NextResponse.json(
        { message: "Cannot reset password for this account type" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
