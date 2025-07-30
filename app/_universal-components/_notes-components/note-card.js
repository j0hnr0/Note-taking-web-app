"use client";

import { openNoteEditor } from "@/app/all-notes/store/notes-slice";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";

export default function NoteCard({ id, title, tags, date, isInArchivedNotes, isInTagNotes, tagText }) {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const pathname = usePathname();
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(openNoteEditor("close"));
  }

  return (
    <Link
      href={isInArchivedNotes ? `/archived-notes/${id}` : isInTagNotes ? `/tags/${tagText}/${id}` : `/all-notes/${id}`}
      onClick={handleClick}
      className={clsx(
        "mt-1 w-full p-2 rounded-md border-b-[1px] border-b-custom-neutral-200 dark:border-b-custom-neutral-800 hover:bg-custom-neutral-100 hover:dark:bg-custom-neutral-800 block hover:border-b-custom-neutral-100 hover:dark:border-b-custom-neutral-800",
        {
          "bg-custom-neutral-100 dark:bg-custom-neutral-800 border-b-custom-neutral-100 dark:border-b-custom-neutral-800":
            isInArchivedNotes ? pathname === `/archived-notes/${id}` : pathname === `/all-notes/${id}`,
        }
      )}
    >
      <h5 className="font-semibold text-base text-custom-neutral-950 dark:text-white">
        {title}
      </h5>

      <div className="flex justify-start gap-1">
        {tags &&
          tags.map((tag, index) => (
            <div
              key={index}
              className="w-min mt-3 py-0.5 px-1.5 text-center rounded-sm bg-custom-neutral-200 dark:bg-custom-neutral-600"
            >
              <span className="font-normal text-xs text-custom-neutral-950 dark:text-white block">
                {tag}
              </span>
            </div>
          ))}
      </div>

      <span className="mt-3 font-normal text-xs text-custom-neutral-700 dark:text-custom-neutral-300">
        {formattedDate}
      </span>
    </Link>
  );
}
