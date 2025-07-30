"use client";

import { useQuery } from "@tanstack/react-query";
import TagsSvg from "../_svg-components/tags-svg";
import NavMenu from "./nav-menu";

export default function TagsNav() {
  const {
    data: tags,
    isPending,
    error,
  } = useQuery({
    queryKey: ["tagsData"],
    queryFn: async () => {
      const response = await fetch("/api/note/get-tags");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch tags");
      }

      return data;
    },
  });

  if (!tags || tags.length <= 0) {
    return null;
  }

  return (
    <>
      <hr className="mt-2 w-full border-t-[1px] border-custom-neutral-200 dark:border-custom-neutral-800" />
      <span className="mt-2 font-medium text-sm text-custom-neutral-500">
        Tags
      </span>

      <nav className="mt-2">
        {tags.map((tag) => (
          <ul key={tag}>
            <NavMenu svg={TagsSvg} href={`/tags/${tag}`}>
              {tag}
            </NavMenu>
          </ul>
        ))}
      </nav>
    </>
  );
}
