"use client";

import ClockSvg from "../_svg-components/clock-svg";
import TagSvg from "../_svg-components/tag-svg";
import Button from "./button";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../_auth-components/auth-spinner";

export default function UpdateNoteForm({ id }) {
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

  if (isPending) {
    return (
      <div className="mt-12">
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

  return (
    <form
      id="create-note-form"
      className="flex flex-col h-full py-5 px-6 w-full max-w-[562px] border-r-[1px] border-r-custom-neutral-200"
    >
      <input
        type="text"
        name="title"
        className="w-full text-custom-neutral-950 inter font-bold text-2xl focus:outline-none"
        placeholder="Enter a title..."
        defaultValue={note.title || "Untitled Note"}
      />

      <div className="mt-4 flex justify-start items-center gap-2">
        <div className="w-full max-w-[115px] flex justify-start items-center gap-1.5">
          <TagSvg fill="#2B303B" width="16" height="16" />
          <label
            htmlFor="tags"
            className="text-custom-neutral-700 inter font-normal text-sm"
          >
            Tags
          </label>
        </div>
        <input
          type="text"
          id="tags"
          name="tags"
          className="w-full text-custom-neutral-950 inter font-normal text-sm rounded-sm"
          placeholder="Add tags separated by commas (e.g. Work, Planning)"
          defaultValue={note.tags?.join(", ") || ""}
        />
      </div>

      <div className="mt-3 flex justify-start items-center gap-2">
        <div className="w-full max-w-[115px] flex justify-start items-center gap-1.5">
          <ClockSvg fill="#2B303B" width="16" height="16" />
          <label
            htmlFor="last-edited"
            className="text-custom-neutral-700 inter font-normal text-sm"
          >
            Last edited
          </label>
        </div>
        <input
          type="text"
          id="last-edited"
          name="last-edited"
          className="w-full text-custom-neutral-950 inter font-normal text-sm rounded-sm"
          placeholder="Not yet saved"
          defaultValue={new Date(note.updatedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
          disabled
        />
      </div>

      <hr className="mt-4 w-full h-[1px] border-custom-neutral-200" />

      <div className="flex-grow flex overflow-hidden">
        <textarea
          name="content"
          className="mt-4 w-full resize-none text-custom-neutral-700 inter font-normal text-sm focus:outline-none"
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
          //   isLoading={mutation.isPending}
        />
        <Button
          type="button"
          btnText="Cancel"
          textColor="text-custom-neutral-600"
          bgColor="bg-custom-neutral-100"
          maxWidth="max-w-[78px]"
          toggle="close"
          //   isLoading={mutation.isPending}
        />
      </div>
    </form>
  );
}
