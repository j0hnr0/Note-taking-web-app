import { hash, compare } from "bcryptjs";
import prisma from "./prisma";
import crypto from "crypto";
import { sendPasswordResetEmail } from "./email";

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
    where: { googleId },
  });

  if (existingUser) {
    return existingUser;
  }

  const user = await prisma.user.create({
    data: {
      email,
      googleId,
      provider: "google",
    },
  });

  return user;
}

export async function sendResetPasswordLink({ email }) {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  // Don't reveal if user exists or not (security)
  if (!user || user.provider === "google") {
    return true;
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiry = new Date(Date.now() + 3600000);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken: resetToken,
      resetTokenExpiry: resetTokenExpiry,
    },
  });

  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

  await sendPasswordResetEmail(user.email, resetLink);

  return true;
}

export async function resetPasswordThroughLink({ token, newPassword }) {
  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: {
        gt: new Date(), // Check if not expired
      },
    },
  });

  if (!user) {
    throw new Error("Invalid or expired token");
  }

  // EXTRA CHECK - Prevent Google users from setting password
  if (user.provider === "google") {
    throw new Error("Cannot reset password for this account type");
  }

  const hashedPassword = await hash(newPassword, 12);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return true;
}
