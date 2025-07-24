"use client";

import ClockSvg from "../_svg-components/clock-svg";
import TagSvg from "../_svg-components/tag-svg";
import Button from "./button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoadingSpinner } from "../_auth-components/auth-spinner";
import Link from "next/link";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function UpdateNoteForm({ id, isInArchivedNotes }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const queryClient = useQueryClient();

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    data: note,
    isPending,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: async () => {
      const response = await fetch(`/api/note/fetch-one-note?id=${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch the note");
      }

      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch(`/api/note/update?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update note");
      }

      return data;
    },
    onSuccess: () => {
      // This will trigger refetch in DisplayDataComponent
      queryClient.invalidateQueries({ queryKey: ["noteData"] });
      queryClient.invalidateQueries({ queryKey: ["note", id] });
      queryClient.invalidateQueries({ queryKey: ["tagsData"] });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    const title = e.target.title.value.trim()
      ? e.target.title.value
      : "Untitled Note";
    const content = e.target.content.value.trim() ? e.target.content.value : "";

    const formData = {
      title: title,
      tags: e.target.tags.value,
      content: content,
    };

    mutation.mutate(formData);
  }

  if (isPending) {
    return (
      <div className="m-12">
        <LoadingSpinner size="md" color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="inter font-normal p-6 text-red-500">
        Error loading note: {error.message}
      </div>
    );
  }

  if (!mounted) return null;

  return (
    <form
      id="create-note-form"
      onSubmit={handleSubmit}
      className="flex flex-col h-full py-5 px-6 w-full max-w-[562px] border-r-[1px] border-r-custom-neutral-200 dark:border-r-custom-neutral-800"
    >
      <input
        type="text"
        name="title"
        className="w-full text-custom-neutral-950 dark:text-white inter font-bold text-2xl focus:outline-none"
        placeholder="Enter a title..."
        defaultValue={note.title || "Untitled Note"}
      />

      <div className="mt-4 flex justify-start items-center gap-2">
        <div className="w-full max-w-[115px] flex justify-start items-center gap-1.5">
          <TagSvg fill={resolvedTheme === "dark" ? "#CACFD8" : "#2B303B"} width="16" height="16" />
          <label
            htmlFor="tags"
            className="text-custom-neutral-700 dark:text-custom-neutral-300 inter font-normal text-sm"
          >
            Tags
          </label>
        </div>
        <input
          type="text"
          id="tags"
          name="tags"
          className="w-full text-custom-neutral-950 dark:text-white inter font-normal text-sm rounded-sm"
          placeholder="Add tags separated by commas (e.g. Work, Planning)"
          defaultValue={note.tags?.join(", ") || ""}
        />
      </div>

      <div className="mt-3 flex justify-start items-center gap-2">
        <div className="w-full max-w-[115px] flex justify-start items-center gap-1.5">
          <ClockSvg fill={resolvedTheme === "dark" ? "#FF0000" : "#FF0000"} width="16" height="16" />
          <label
            htmlFor="last-edited"
            className="text-custom-neutral-700 dark:text-custom-neutral-300 inter font-normal text-sm"
          >
            Last edited
          </label>
        </div>
        <input
          type="text"
          id="last-edited"
          name="last-edited"
          className="w-full text-custom-neutral-950 dark:text-custom-neutral-300 inter font-normal text-sm rounded-sm"
          placeholder="Not yet saved"
          defaultValue={new Date(note.updatedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
          disabled
        />
      </div>

      <hr className="mt-4 w-full h-[1px] border-custom-neutral-200 dark:border-custom-neutral-800" />

      <div className="flex-grow flex overflow-hidden">
        <textarea
          name="content"
          className="mt-4 w-full resize-none text-custom-neutral-700 dark:text-custom-neutral-100 inter font-normal text-sm focus:outline-none"
          placeholder="Start typing your note here..."
          defaultValue={note.content || ""}
        ></textarea>
      </div>

      <hr className="mt-4 w-full h-[1px] border-custom-neutral-200 " />

      <div className="mt-4 flex justify-start gap-4">
        <Button
          type="submit"
          btnText="Save Note"
          textColor="text-white"
          bgColor="bg-custom-blue-500"
          maxWidth="max-w-[99px]"
          isLoading={mutation.isPending}
        />
        <Link
          href={isInArchivedNotes ? "/archived-notes" : "/all-notes"}
          className={clsx(
            `w-full max-w-[78px] py-3 text-center rounded-lg`,
            mutation.isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-custom-neutral-100 cursor-pointer"
          )}
        >
          <h5 className="inter font-medium text-sm text-custom-neutral-600">
            {mutation.isPending ? (
              <span className="mr-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Cancel"
            )}
          </h5>
        </Link>
      </div>
    </form>
  );
}
