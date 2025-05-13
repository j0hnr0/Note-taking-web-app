import ArchiveSvg from "../../_svg-components/archive-svg";
import HomeSvg from "../../_svg-components/home-svg";
import MNavMenu from "./m-nav-menu";

export default function MFooterMenu() {
  return (
    <footer className="max-custom-lg:block hidden w-full py-3 px-8 shadow-[0_-4px_6px_0_rgba(240,240,240,0.6)] fixed bottom-0 left-0 z-50">
      <nav>
        <ul className="flex justify-between items-center">
          <MNavMenu label="Home" svg={HomeSvg} href="/all-notes" />
          <MNavMenu label="Search" svg={HomeSvg} href="/" />
          <MNavMenu label="Archived" svg={ArchiveSvg} href="/" />
          <MNavMenu label="Tags" svg={HomeSvg} href="/" />
          <MNavMenu label="Settings" svg={HomeSvg} href="/" />
        </ul>
      </nav>
    </footer>
  );
}
