"use client";

import { useSelector } from "react-redux";
import Button from "./button";
import EmptyMessage from "./empty-message";
import UntitledNote from "./untitled-note";
import { useQuery } from "@tanstack/react-query";
import NoteCard from "./note-card";
import { LoadingSpinner } from "../_auth-components/auth-spinner";
import { useSearchParams } from "next/navigation";

export default function NotesList({
  isInArchivedNotes,
  isInTagNotes,
  tagText,
}) {
  const isOpen = useSelector((state) => state.notes.isNoteEditorOpen);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  const {
    data: notes,
    isPending,
    error,
  } = useQuery({
    queryKey: [
      "noteData",
      isInArchivedNotes,
      isInTagNotes,
      tagText,
      searchQuery,
    ],
    queryFn: async () => {
      let url = `/api/note/search?query=${encodeURIComponent(
        searchQuery
      )}&archive=${isInArchivedNotes}`;

      if (isInTagNotes) {
        url = `/api/note/get-tag-note?tag=${tagText}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch notes");
      }

      return data;
    },
  });

  return (
    <div className="w-full max-w-[290px] py-5 px-8 border-r-[1px] border-r-custom-neutral-200 h-full">
      <Button
        type="button"
        btnText="+ Create New Note"
        textColor="text-white"
        bgColor="bg-custom-blue-500"
        toggle="open"
      />
      <div className="mb-3"></div>

      {isInArchivedNotes && (
        <p className="mt-4 inter font-normal text-sm text-custom-neutral-700">
          All your archived notes are stored here. You can restore or delete
          them anytime.
        </p>
      )}

      {isInTagNotes && (
        <p className="mt-4 inter font-normal text-sm text-custom-neutral-700">
          {`All notes with the ”${tagText}” tag are shown here.`}
        </p>
      )}

      {isOpen && <UntitledNote />}

      {isPending && (
        <div className="mt-12">
          <LoadingSpinner size="md" color="primary" />
        </div>
      )}

      {error && (
        <div className="inter font-normal p-6 text-red-500">
          Error loading notes: {error.message}
        </div>
      )}

      {notes &&
        notes.length > 0 &&
        notes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            title={note.title}
            tags={note.tags}
            date={note.updatedAt}
            isInArchivedNotes={isInArchivedNotes}
            isInTagNotes={isInTagNotes}
            tagText={tagText}
          />
        ))}

      {notes && notes.length === 0 && !isOpen && (
        <EmptyMessage
          message={
            isInArchivedNotes
              ? "No notes have been archived yet. Move notes here for safekeeping, or create a new note."
              : "You don't have any notes yet. Start a new note to capture your thoughts and ideas."
          }
        />
      )}
    </div>
  );
}
