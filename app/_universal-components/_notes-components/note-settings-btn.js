"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NoteSettingsBtn({
  id,
  svg: Svg,
  text,
  isInArchivedNotes,
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

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
      queryClient.invalidateQueries({ queryKey: ["tagsData"] });
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

  if (!mounted) return null;

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
      className="cursor-pointer w-full rounded-lg py-3 px-4 flex justify-start items-center gap-2 border-[1px] border-custom-neutral-300 dark:border-custom-neutral-600
      hover:bg-custom-neutral-100"
      disabled={
        deleteMutation.isPending ||
        archiveMutation.isPending ||
        restoreMutation.isPending
      }
    >
      <Svg fill={resolvedTheme === "dark" ? "#FFFFFF" : "#2B303B"} />
      <span className="block inter font-medium text-sm text-custom-neutral-950 dark:text-white">
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
