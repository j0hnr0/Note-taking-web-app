"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function NoteSettingsBtn({
  id,
  svg: Svg,
  text,
  isInArchivedNotes,
}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: async (noteId) => {
      const response = await fetch(`/api/note/delete?id=${noteId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete selected note");
      }

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["noteData"] });
      router.push(isInArchivedNotes ? "/archived-notes" : "/all-notes");
    },
  });

  const archiveMutation = useMutation({
    mutationFn: async (noteId) => {
      const response = await fetch(`/api/note/archive-note?id=${noteId}`, {
        method: "PATCH",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to move note to archive");
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["noteData"] });
      router.push("/all-notes");
    },
  });

  // Continue here:
  const restoreMutation = useMutation({
    mutationFn: async (noteId) => {
      const response = await fetch(`/api/note/restore-note?id=${noteId}`, {
        method: "PATCH",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to restore note");
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["noteData"] });
      router.push("/archived-notes");
    },
  });

  function handleDeleteClick() {
    deleteMutation.mutate(id);
  }

  function handleArchiveClick() {
    archiveMutation.mutate(id);
  }

  function handleRestoreClick() {
    restoreMutation.mutate(id);
  }

  return (
    <button
      type="button"
      onClick={
        text === "Delete Note"
          ? handleDeleteClick
          : text === "Restore Note"
          ? handleRestoreClick
          : handleArchiveClick
      }
      className="cursor-pointer w-full rounded-lg py-3 px-4 flex justify-start items-center gap-2 border-[1px] border-custom-neutral-300
      hover:bg-custom-neutral-100"
      disabled={
        deleteMutation.isPending ||
        archiveMutation.isPending ||
        restoreMutation.isPending
      }
    >
      <Svg fill="#2B303B" />
      <span className="block inter font-medium text-sm text-custom-neutral-950">
        {deleteMutation.isPending
          ? "Deleting..."
          : archiveMutation.isPending
          ? "Archiving..."
          : restoreMutation.isPending
          ? "Restoring..."
          : text}
      </span>
    </button>
  );
}
