"use client";

import { openNoteEditor } from "@/app/all-notes/store/notes-slice";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";

export default function NoteCard({ id, title, tags, date }) {
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
      href={`/all-notes/${id}`}
      onClick={handleClick}
      className={clsx(
        "mt-1 w-full p-2 rounded-md border-b-[1px] border-b-custom-neutral-200 hover:bg-custom-neutral-100 block hover:border-b-custom-neutral-100",
        {
          "bg-custom-neutral-100 border-b-custom-neutral-100":
            pathname === `/all-notes/${id}`,
        }
      )}
    >
      <h5 className="inter font-semibold text-base text-custom-neutral-950">
        {title}
      </h5>

      <div className="flex justify-start gap-1">
        {tags &&
          tags.map((tag, index) => (
            <div
              key={index}
              className="w-min mt-3 py-0.5 px-1.5 text-center rounded-sm bg-custom-neutral-200"
            >
              <span className="inter font-normal text-xs text-custom-neutral-950 block">
                {tag}
              </span>
            </div>
          ))}
      </div>

      <span className="mt-3 inter font-normal text-xs text-custom-neutral-700">
        {formattedDate}
      </span>
    </Link>
  );
}
