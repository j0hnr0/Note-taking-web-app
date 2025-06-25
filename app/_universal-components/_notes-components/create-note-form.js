"use client";

import { useDispatch } from "react-redux";
import ClockSvg from "../_svg-components/clock-svg";
import TagSvg from "../_svg-components/tag-svg";
import Button from "./button";
import {
  openNoteEditor,
  updateNoteTitle,
} from "@/app/all-notes/store/notes-slice";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreateNoteForm({ isInArchivedNotes }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch(isInArchivedNotes ? "/api/note/create-archive-note" : "/api/note/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send data");
      }

      return data;
    },
    onSuccess: () => {
      // This will trigger refetch in DisplayDataComponent
      queryClient.invalidateQueries({ queryKey: ["noteData"] });
      queryClient.invalidateQueries({ queryKey: ["tagsData"] });
      dispatch(openNoteEditor("close"));
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    const title = e.target.title.value.trim()
      ? e.target.title.value
      : "Untitled Note";
    const content = e.target.content.value.trim() ? e.target.content.value : "";

    const tags = e.target.tags.value
      ? e.target.tags.value
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
          .map(
            (tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
          )
      : [];

    const formData = {
      title: title,
      tags: tags,
      content: content,
    };

    mutation.mutate(formData);
  }

  function handleTitleChange(e) {
    const newTitle = e.target.value;

    dispatch(updateNoteTitle(newTitle === "" ? "Untitled Note" : newTitle));
  }

  return (
    <form
      id="create-note-form"
      onSubmit={handleSubmit}
      className="flex flex-col h-full py-5 px-6 w-full max-w-[562px] border-r-[1px] border-r-custom-neutral-200"
    >
      <input
        type="text"
        name="title"
        onChange={handleTitleChange}
        className="w-full text-custom-neutral-950 inter font-bold text-2xl focus:outline-none"
        placeholder="Enter a title..."
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
          disabled
        />
      </div>

      <hr className="mt-4 w-full h-[1px] border-custom-neutral-200" />

      <div className="flex-grow flex overflow-hidden">
        <textarea
          name="content"
          className="mt-4 w-full resize-none text-custom-neutral-700 inter font-normal text-sm focus:outline-none"
          placeholder="Start typing your note here..."
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
        <Button
          type="button"
          btnText="Cancel"
          textColor="text-custom-neutral-600"
          bgColor="bg-custom-neutral-100"
          maxWidth="max-w-[78px]"
          toggle="close"
          isLoading={mutation.isPending}
        />
      </div>
    </form>
  );
}
