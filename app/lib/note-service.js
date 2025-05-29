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

export async function getUserNoteById({ id }) {
  const note = await prisma.note.findUnique({
    where: {
      id: id,
    },
  });

  return note;
}

export async function updateUserNoteById({ id, data }) {
  // First, get current note
  const currentNote = await prisma.note.findUnique({ where: { id } });

  if (!currentNote) {
    throw new Error("Note not found");
  }

  const updateData = {};

  // Only add fields that are different from current values
  if (data.title !== undefined && data.title !== currentNote.title) {
    updateData.title = data.title;
  }

  if (data.content !== undefined && data.content !== currentNote.content) {
    updateData.content = data.content;
  }

  if (data.tags !== undefined) {
    const newTags = data.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    // Compare arrays
    const tagsChanged =
      JSON.stringify(newTags) !== JSON.stringify(currentNote.tags || []);

    if (tagsChanged) {
      updateData.tags = newTags;
    }
  }

  // Only update if something actually changed
  if (Object.keys(updateData).length === 0) {
    return currentNote; // Return without updating
  }

  return await prisma.note.update({
    where: { id },
    data: updateData,
  });
}
