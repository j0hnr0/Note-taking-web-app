import prisma from "./prisma";
import { findUserById } from "./user-service";

export async function createNote({ userId, title, content, tags }) {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not Found");
  }

  const note = await prisma.note.create({
    data: {
      title,
      content,
      tags: tags || [],
      userId,
    },
  });

  return note;
}

export async function getUserNotes({ userId }) {
  const notes = await prisma.note.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return notes;
}
