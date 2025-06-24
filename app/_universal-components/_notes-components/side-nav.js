import ArchiveSvg from "../_svg-components/archive-svg";
import HomeSvg from "../_svg-components/home-svg";
import Logo from "../_svg-components/logo";
import NavMenu from "./nav-menu";
import TagsSvg from "../_svg-components/tags-svg";

export default function SideNav() {
  return (
    <aside
      className="w-full max-w-[272px] h-full px-4 pt-6 border-r-[1px] border-r-custom-neutral-200
    max-custom-lg:hidden"
    >
      <Logo />
      <nav className="mt-7">
        <ul>
          <NavMenu svg={HomeSvg} href="/all-notes">
            All Notes
          </NavMenu>
          <NavMenu svg={ArchiveSvg} href="/archived-notes">
            Archived Notes
          </NavMenu>
        </ul>
      </nav>

      <hr className="mt-2 w-full border-t-[1px] border-custom-neutral-200" />

      <span className="mt-2 inter font-medium text-sm text-custom-neutral-500">
        Tags
      </span>

      {/* Tags */}
      <nav className="mt-2">
        <ul>
          <NavMenu svg={TagsSvg} href="/tags/dev">
            Dev
          </NavMenu>
        </ul>
      </nav>
    </aside>
  );
}
