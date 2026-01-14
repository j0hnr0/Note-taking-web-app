"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import MFooterMenu from "../_universal-components/_notes-components/mobile/m-footer-menu";
import MHeader from "../_universal-components/_notes-components/mobile/m-header";
import Header from "../_universal-components/_notes-components/header";
import SideNav from "../_universal-components/_notes-components/side-nav";
import { LoadingSpinner } from "../_universal-components/_auth-components/auth-spinner";
import TagSvg from "../_universal-components/_svg-components/tag-svg";

export default function TagsPage() {
  const router = useRouter();

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

  function handleTagClick(tag) {
    router.push(`/tags/${tag}`);
  }

  return (
    <div className="flex items-start h-screen max-custom-lg:block max-custom-lg:h-auto">
      {/* Mobile components */}
      <MHeader />
      <MFooterMenu />

      {/* Desktop components */}
      <SideNav />
      <div className="w-full h-full flex flex-col max-custom-lg:hidden">
        <Header title="Tags" />
      </div>

      {/* Shared content - visible on both mobile and desktop */}
      <div className="w-full p-8 max-custom-lg:px-4 max-custom-lg:py-6 max-custom-lg:pb-24">
        <div className="max-custom-lg:block hidden">
          <h1 className="font-bold text-2xl text-custom-neutral-950 dark:text-white mb-6">
            Tags
          </h1>
        </div>

        {isPending && (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="md" color="primary" />
          </div>
        )}

        {error && (
          <div className="font-normal p-6 text-red-500">
            Error loading tags: {error.message}
          </div>
        )}

        {tags && tags.length === 0 && (
          <div className="text-center py-12">
            <p className="font-normal text-sm text-custom-neutral-700 dark:text-custom-neutral-300">
              No tags found. Create notes with tags to see them here.
            </p>
          </div>
        )}

        {tags && tags.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tags.map((tagData, index) => (
              <button
                key={`${tagData.tag}-${index}`}
                onClick={() => handleTagClick(tagData.tag)}
                className="p-4 rounded-lg border-[1px] border-custom-neutral-200 dark:border-custom-neutral-800
                         hover:bg-custom-neutral-100 dark:hover:bg-custom-neutral-800
                         transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-custom-blue-50 dark:bg-custom-neutral-900">
                    <TagSvg fill="#335CFF" width="20" height="20" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base text-custom-neutral-950 dark:text-white">
                      {tagData.tag}
                    </h3>
                    <p className="font-normal text-sm text-custom-neutral-600 dark:text-custom-neutral-400">
                      {tagData.count} {tagData.count === 1 ? "note" : "notes"}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
