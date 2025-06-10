"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function NoteSettingsBtn({ id, svg: Svg, text }) {
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
      router.push("/all-notes");
    },
  });

  const archiveMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`api/note/archive-note?id=${id}`, {
        method: "PATCH",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to move note to archive");
      }

      return data
    },
    onSuccess: () => {
      // TODO: CONTINUE INVALIDATING QUERIES HERE!!!
    }
  });

  function handleClick() {
    deleteMutation.mutate(id);
  }

  return (
    <button
      type="button"
      onClick={text === "Delete Note" ? handleClick : undefined}
      className="cursor-pointer w-full rounded-lg py-3 px-4 flex justify-start items-center gap-2 border-[1px] border-custom-neutral-300
      hover:bg-custom-neutral-100"
      disabled={deleteMutation.isPending}
    >
      <Svg fill="#2B303B" />
      <span className="block inter font-medium text-sm text-custom-neutral-950">
        {deleteMutation.isPending ? "Deleting..." : text}
      </span>
    </button>
  );
}
