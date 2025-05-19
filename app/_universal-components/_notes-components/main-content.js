"use client";

import NotesList from "./notes-list";
import CreateNoteForm from "./create-note-form";
import { useSelector } from "react-redux";

export default function MainContent() {
  const isOpen = useSelector(state => state.notes.isNoteEditorOpen);

  return (
    <div className="flex justify-start items-start h-full">
      <NotesList />
      {isOpen && <CreateNoteForm />}
    </div>
  );
}
