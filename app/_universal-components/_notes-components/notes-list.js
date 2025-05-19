"use client";

import { useSelector } from "react-redux";
import Button from "./button";
import EmptyMessage from "./empty-message";
import UntitledNote from "./untitled-note";

export default function NotesList() {
  const isOpen = useSelector((state) => state.notes.isNoteEditorOpen);

  return (
    <div className="w-full max-w-[290px] py-5 px-8 border-r-[1px] border-r-custom-neutral-200 h-full">
      <Button
        type="button"
        btnText="+ Create New Note"
        textColor="text-white"
        bgColor="bg-custom-blue-500"
        toggle="open"
      />

      {isOpen ? (
        <UntitledNote />
      ) : (
        <EmptyMessage message="You don’t have any notes yet. Start a new note to capture your thoughts and ideas." />
      )}
    </div>
  );
}
