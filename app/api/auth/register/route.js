import { NextResponse } from "next/server";
import { createUser } from "@/app/lib/user-service";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Create the user (user service handles duplicate check)
    try {
      const user = await createUser({
        email,
        password,
      });

      return NextResponse.json(
        {
          message: "User registered successfully",
          user: {
            id: user.id,
            email: user.email,
          },
        },
        { status: 201 }
      );
    } catch (error) {
      if (error.message === "User already exists") {
        return NextResponse.json(
          { message: "User with this email already exists" },
          { status: 409 }
        );
      }
      throw error; // Re-throw for the outer catch
    }
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
