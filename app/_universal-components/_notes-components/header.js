import Link from "next/link";
import SettingSvg from "../_svg-components/setting-svg";
import Search from "./search";

export default function Header({ title }) {
  return (
    <header className="pl-8 pr-10 py-[18.5px] border-b-[1px] border-b-custom-neutral-200 dark:border-b-neutral-800 flex justify-between items-center">
      <h1 className="inter font-bold text-2xl text-custom-neutral-950 dark:text-white">
        {title}
      </h1>
      <div className="flex justify-end items-center gap-6 w-2/4">
        <Search />
        <Link href="/settings/color-theme">
          <SettingSvg fill="#717784" />
        </Link>
      </div>
    </header>
  );
}
