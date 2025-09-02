import { sendResetPasswordLink } from "@/app/lib/user-service";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email } = await request.json();

    await sendResetPasswordLink({ email });

    return NextResponse.json(
      { message: "If an account exist, we sent an email" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong." },
      { status: 500 }
    );
  }
}
