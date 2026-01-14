"use client";

import NotesList from "./notes-list";
import CreateNoteForm from "./create-note-form";
import { useSelector } from "react-redux";

export default function MainContent({
  isInArchivedNotes,
  isInTagNotes,
  tagText,
}) {
  const isOpen = useSelector((state) => state.notes.isNoteEditorOpen);

  return (
    <div className="flex justify-start items-start h-full max-custom-sm:flex-col">
      <NotesList
        isInArchivedNotes={isInArchivedNotes}
        isInTagNotes={isInTagNotes}
        tagText={tagText}
      />

      {isOpen && <CreateNoteForm isInArchivedNotes={isInArchivedNotes} />}
    </div>
  );
}
