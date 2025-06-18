import SettingSvg from "../_svg-components/setting-svg";
import Search from "./search";

export default function Header({ title }) {
  return (
    <header className="pl-8 pr-10 py-[18.5px] border-b-[1px] border-b-custom-neutral-200 flex justify-between items-center">
      <h1 className="inter font-bold text-2xl text-custom-neutral-950">
        {title}
      </h1>
      <div className="flex justify-end items-center gap-6 w-2/4">
        <Search />
        <SettingSvg fill="#717784" />
      </div>
    </header>
  );
}
