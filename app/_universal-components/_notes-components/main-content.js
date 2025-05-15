"use client";

import { useToggle } from "@/app/contexts/toggle-provider";
import NotesList from "./notes-list";
import CreateNoteForm from "./create-note-form";

export default function MainContent() {
  const { isCreateNewNoteOpen } = useToggle();

  return (
    <div className="flex justify-start items-start h-full">
      <NotesList />
      {isCreateNewNoteOpen && <CreateNoteForm />}
    </div>
  );
}
