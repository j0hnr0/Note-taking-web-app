import ArchiveSvg from "../../_svg-components/archive-svg";
import HomeSvg from "../../_svg-components/home-svg";
import SearchSvg from "../../_svg-components/search-svg";
import SettingSvg from "../../_svg-components/setting-svg";
import TagSvg from "../../_svg-components/tag-svg";
import MNavMenu from "./m-nav-menu";

export default function MFooterMenu() {
  return (
    <footer className="max-custom-lg:block hidden w-full py-3 px-8 shadow-[0_-4px_6px_0_rgba(240,240,240,0.6)] fixed bottom-0 left-0 z-40 border-t-[1px] border-t-custom-neutral-200
    max-custom-sm:px-4">
      <nav>
        <ul className="flex justify-between items-center">
          <MNavMenu label="Home" svg={HomeSvg} href="/all-notes" />
          <MNavMenu label="Search" svg={SearchSvg} href="/search" />
          <MNavMenu label="Archived" svg={ArchiveSvg} href="/archived-notes" />
          <MNavMenu label="Tags" svg={TagSvg} href="/tags" />
          <MNavMenu label="Settings" svg={SettingSvg} href="/settings/color-theme" />
        </ul>
      </nav>
    </footer>
  );
}
