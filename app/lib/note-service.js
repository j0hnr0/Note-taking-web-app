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
      isArchive: false,
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
      .filter((tag) => tag.length > 0)
      .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());

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

export async function deleteUserNoteById({ id, userId }) {
  const result = await prisma.note.deleteMany({
    where: {
      id,
      userId,
    },
  });

  if (result.count === 0) {
    throw new Error("Note not found or unauthorized");
  }

  return { success: true, id };
}

export async function moveNoteToArchive({ id }) {
  const currentNote = await prisma.note.findUnique({ where: { id } });

  if (!currentNote) {
    throw new Error("Note not found");
  }

  const archivedNote = await prisma.note.update({
    where: { id },
    data: {
      isArchive: true,
    },
  });

  return archivedNote;
}

export async function getUserArchivedNotes({ userId }) {
  const notes = await prisma.note.findMany({
    where: {
      userId: userId,
      isArchive: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return notes;
}

export async function restoreNote({ id }) {
  const currentNote = await prisma.note.findUnique({ where: { id } });

  if (!currentNote) {
    throw new Error("Note not found");
  }

  const restoredNote = await prisma.note.update({
    where: { id },
    data: {
      isArchive: false,
    },
  });

  return restoredNote;
}

export async function createArchiveNote({ userId, title, content, tags }) {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not Found");
  }

  const note = await prisma.note.create({
    data: {
      title,
      content,
      tags: tags || [],
      isArchive: true,
      userId,
    },
  });

  return note;
}
