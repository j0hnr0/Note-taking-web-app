import SearchSvg from "../_svg-components/search-svg";

export default function Search() {
  return (
    <div className="py-3 px-4 flex justify-start items-center gap-2 border-[1px] border-custom-neutral-200 rounded-lg w-full max-w-[300px]">
      <SearchSvg fill="#717784" />
      <input
        className="inter font-normal text-sm text-custom-neutral-500 focus:outline-none w-full h-full"
        placeholder="Search by title, content, or tags..."
      />
    </div>
  );
}
