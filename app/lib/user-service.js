import { hash, compare } from "bcryptjs";
import prisma from "./prisma";

export async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function findUserById(id) {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function createUser({ email, password }) {
  // Check if user exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password
  const hashedPassword = await hash(password, 12);

  // Create the user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function validateCredentials(email, password) {
  const user = await findUserByEmail(email);

  if (!user || !user.password) {
    return null;
  }

  const isValid = await compare(password, user.password);

  if (!isValid) {
    return null;
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function updateUser(id, data) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

export async function deleteUser(id) {
  return prisma.user.delete({
    where: { id },
  });
}

export async function updatePassword({ userId, oldPassword, newPassword }) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      password: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await compare(oldPassword, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid old password");
  }

  const hashedNewPassword = await hash(newPassword, 12);

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedNewPassword,
    },
  });

  return { success: true, message: "Password updated successfully" };
}

export async function createGoogleUser({ email, googleId }) {
  const existingUser = await prisma.user.findUnique({
    where: { googleId }
  });

  if (existingUser) {
    return existingUser;
  }

  const user = await prisma.user.create({
    data: {
      email, 
      googleId,
      provider: "google"
    }
  });

  return user;
}
