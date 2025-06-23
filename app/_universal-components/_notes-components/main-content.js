"use client";

import NotesList from "./notes-list";
import CreateNoteForm from "./create-note-form";
import { useSelector } from "react-redux";

export default function MainContent({ isInArchivedNotes }) {
  const isOpen = useSelector((state) => state.notes.isNoteEditorOpen);

  return (
    <div className="flex justify-start items-start h-full">
      <NotesList isInArchivedNotes={isInArchivedNotes} />
      {isOpen && <CreateNoteForm isInArchivedNotes={isInArchivedNotes} />}
    </div>
  );
}
