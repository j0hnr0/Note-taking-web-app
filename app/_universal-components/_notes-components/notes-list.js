"use client";

import { useSelector } from "react-redux";
import Button from "./button";
import EmptyMessage from "./empty-message";
import UntitledNote from "./untitled-note";
import { useAuth } from "@/app/contexts/auth-provider";
import { useQuery } from "@tanstack/react-query";
import NoteCard from "./note-card";

export default function NotesList() {
  const isOpen = useSelector((state) => state.notes.isNoteEditorOpen);
  const { user } = useAuth();

  const {
    data: notes,
    isPending,
    error,
  } = useQuery({
    queryKey: ["noteData"],
    queryFn: async () => {
      const response = await fetch(`/api/note/fetch?userId=${user.id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch notes");
      }

      return data;
    },
  });

  if (isPending) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="w-full max-w-[290px] py-5 px-8 border-r-[1px] border-r-custom-neutral-200 h-full">
      <Button
        type="button"
        btnText="+ Create New Note"
        textColor="text-white"
        bgColor="bg-custom-blue-500"
        toggle="open"
      />
      <div className="mb-4"></div>

      {isOpen && <UntitledNote />}

      {notes ? notes.map((note) => (
        <NoteCard key={note.id} title={note.title} tags={note.tags} date={note.updatedAt} />
      )) : <EmptyMessage message="You don’t have any notes yet. Start a new note to capture your thoughts and ideas." />}
    </div>
  );
}
