import prisma from "./prisma";
import { findUserById } from "./user-service";

export async function createNote({ id, title, content, tags }) {
  const user = await findUserById(id);

  if (!user) {
    throw new Error("User not Found");
  }

  const note = await prisma.note.create({
    data: {
      title,
      content,
      tags: tags || [],
      userId: id,
    },
  });

  return note;
}
