"use client";

import { Suspense } from "react";
import { useSelector } from "react-redux";
import Button from "./button";
import EmptyMessage from "./empty-message";
import UntitledNote from "./untitled-note";
import { useQuery } from "@tanstack/react-query";
import NoteCard from "./note-card";
import { LoadingSpinner } from "../_auth-components/auth-spinner";
import { useSearchParams } from "next/navigation";

function NotesListContent({ isInArchivedNotes, isInTagNotes, tagText }) {
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
        url = `/api/note/get-tag-note?tag=${tagText}&query=${encodeURIComponent(searchQuery)}`;
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
    <div className="w-full max-w-[290px] max-custom-md:max-w-full py-5 px-8 border-r-[1px] border-r-custom-neutral-200 dark:border-r-custom-neutral-800 h-full max-custom-lg:px-4 max-custom-lg:py-4 max-custom-lg:border-r-0 max-custom-lg:pb-24 max-custom-sm:order-3">
      <Button
        type="button"
        btnText="+ Create New Note"
        textColor="text-white"
        bgColor="bg-custom-blue-500"
        toggle="open"
      />
      <div className="mb-3"></div>

      {isInArchivedNotes && (
        <p className="mt-4 font-normal text-sm text-custom-neutral-700 dark:text-custom-neutral-200">
          All your archived notes are stored here. You can restore or delete
          them anytime.
        </p>
      )}

      {isInTagNotes && (
        <p className="mt-4 font-normal text-sm text-custom-neutral-700 dark:text-white">
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
        <div className="font-normal p-6 text-red-500">
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

function NotesListFallback({ isInArchivedNotes, isInTagNotes, tagText }) {
  return (
    <div className="w-full max-w-[290px] max-custom-md:max-w-full py-5 px-8 border-r-[1px] border-r-custom-neutral-200 dark:border-r-custom-neutral-800 h-full max-custom-lg:px-4 max-custom-lg:py-4 max-custom-lg:border-r-0 max-custom-lg:pb-24 max-custom-sm:order-3">
      <Button
        type="button"
        btnText="+ Create New Note"
        textColor="text-white"
        bgColor="bg-custom-blue-500"
        toggle="open"
      />
      <div className="mb-3"></div>

      {isInArchivedNotes && (
        <p className="mt-4 font-normal text-sm text-custom-neutral-700 dark:text-custom-neutral-200">
          All your archived notes are stored here. You can restore or delete
          them anytime.
        </p>
      )}

      {isInTagNotes && (
        <p className="mt-4 font-normal text-sm text-custom-neutral-700 dark:text-white">
          {`All notes with the "${tagText}" tag are shown here.`}
        </p>
      )}

      <div className="mt-12">
        <LoadingSpinner size="md" color="primary" />
      </div>
    </div>
  );
}

export default function NotesList(props) {
  return (
    <Suspense fallback={<NotesListFallback {...props} />}>
      <NotesListContent {...props} />
    </Suspense>
  );
}
