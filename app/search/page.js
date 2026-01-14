"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import MFooterMenu from "../_universal-components/_notes-components/mobile/m-footer-menu";
import MHeader from "../_universal-components/_notes-components/mobile/m-header";
import Header from "../_universal-components/_notes-components/header";
import SideNav from "../_universal-components/_notes-components/side-nav";
import NoteCard from "../_universal-components/_notes-components/note-card";
import { LoadingSpinner } from "../_universal-components/_auth-components/auth-spinner";
import SearchSvg from "../_universal-components/_svg-components/search-svg";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const debouncedSearch = useDebouncedCallback((value) => {
    setDebouncedQuery(value);
  }, 300);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
  };

  const {
    data: notes,
    isPending,
    error,
  } = useQuery({
    queryKey: ["searchResults", debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery) return null;

      const response = await fetch(
        `/api/note/search?query=${encodeURIComponent(debouncedQuery)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to search notes");
      }

      return data;
    },
    enabled: debouncedQuery.length > 0,
  });

  return (
    <div className="flex items-start h-screen max-custom-lg:block max-custom-lg:h-auto">
      {/* Mobile components */}
      <MHeader />
      <MFooterMenu />

      {/* Desktop components */}
      <SideNav />
      <div className="w-full h-full flex flex-col max-custom-lg:hidden">
        <Header title="Search" />
      </div>

      {/* Shared content - visible on both mobile and desktop */}
      <div className="w-full h-full overflow-auto p-8 max-custom-lg:px-4 max-custom-lg:py-6 max-custom-lg:pb-24">
        <div className="max-custom-lg:block hidden mb-6">
          <h1 className="font-bold text-2xl text-custom-neutral-950 dark:text-white">
            Search Notes
          </h1>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <div className="py-3 px-4 flex justify-start items-center gap-2 border-[1px] border-custom-neutral-200 dark:border-custom-neutral-600 rounded-lg w-full">
            <SearchSvg fill="#717784" />
            <input
              type="text"
              className="font-normal text-sm text-custom-neutral-950 dark:text-custom-neutral-100 focus:outline-none w-full h-full bg-transparent"
              placeholder="Search by title, content, or tags..."
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="px-2 py-1 hover:bg-custom-neutral-100 dark:hover:bg-custom-neutral-800 rounded transition-colors text-custom-neutral-600 dark:text-custom-neutral-400 text-xl font-light"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        <div className="max-w-4xl">
          {!debouncedQuery && (
            <div className="text-center py-12">
              <p className="font-normal text-sm text-custom-neutral-700 dark:text-custom-neutral-300">
                Start typing to search your notes by title, content, or tags
              </p>
            </div>
          )}

          {isPending && debouncedQuery && (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner size="md" color="primary" />
            </div>
          )}

          {error && (
            <div className="font-normal p-6 text-red-500">
              Error searching notes: {error.message}
            </div>
          )}

          {notes && notes.length === 0 && debouncedQuery && (
            <div className="text-center py-12">
              <p className="font-normal text-sm text-custom-neutral-700 dark:text-custom-neutral-300">
                No notes found matching &quot;{debouncedQuery}&quot;
              </p>
            </div>
          )}

          {notes && notes.length > 0 && (
            <div>
              <p className="font-normal text-sm text-custom-neutral-700 dark:text-custom-neutral-300 mb-4">
                Found {notes.length} {notes.length === 1 ? "note" : "notes"}
              </p>
              <div className="space-y-2">
                {notes.map((note) => (
                  <NoteCard
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    tags={note.tags}
                    date={note.updatedAt}
                    isInArchivedNotes={false}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
