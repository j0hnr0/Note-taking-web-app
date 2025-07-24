"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';
import SearchSvg from "../_svg-components/search-svg";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Debounce the search to wait 300ms after user stops typing
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="py-3 px-4 flex justify-start items-center gap-2 border-[1px] border-custom-neutral-200 dark:border-custom-neutral-600 rounded-lg w-full max-w-[300px]">
      <SearchSvg fill="#717784" />
      <input
        type="text"
        className="inter font-normal text-sm text-custom-neutral-500 focus:outline-none w-full h-full"
        placeholder="Search by title, content, or tags..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}
