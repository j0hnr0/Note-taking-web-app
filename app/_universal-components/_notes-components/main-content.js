"use client";

import NotesList from "./notes-list";
import CreateNoteForm from "./create-note-form";
import { useSelector } from "react-redux";
import { Suspense } from "react";

export default function MainContent({
  isInArchivedNotes,
  isInTagNotes,
  tagText,
}) {
  const isOpen = useSelector((state) => state.notes.isNoteEditorOpen);

  return (
    <div className="flex justify-start items-start h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <NotesList
          isInArchivedNotes={isInArchivedNotes}
          isInTagNotes={isInTagNotes}
          tagText={tagText}
        />
      </Suspense>

      {isOpen && <CreateNoteForm isInArchivedNotes={isInArchivedNotes} />}
    </div>
  );
}
