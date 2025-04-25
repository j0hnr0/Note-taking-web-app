import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma";

export async function GET(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }
    
    // Get userId from query params
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    
    // Users can only access their own profile
    if (userId !== session.user.id) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 403 }
      );
    }
    
    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        // Don't include password!
      }
    });
    
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Profile API error:", error);
    return NextResponse.json(
      { message: "Failed to load profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }
    
    // Get request body
    const body = await request.json();
    const { id, ...updateData } = body;
    
    // Users can only update their own profile
    if (id !== session.user.id) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 403 }
      );
    }
    
    // Remove sensitive fields from update data
    delete updateData.password;
    
    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        updatedAt: true,
      }
    });
    
    return NextResponse.json({ 
      message: "Profile updated successfully",
      user: updatedUser 
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}