"use client";

import { useToggle } from "@/app/contexts/toggle-provider";
import NotesList from "./notes-list";

export default function MainContent() {
  const { isCreateNewNoteOpen } = useToggle();

  return (
    <div className="flex justify-start items-start h-full">
      <NotesList />
      {isCreateNewNoteOpen && <h1>Create A Note: </h1>}
    </div>
  );
}
