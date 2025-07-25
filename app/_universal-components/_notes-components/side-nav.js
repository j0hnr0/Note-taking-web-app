import ArchiveSvg from "../_svg-components/archive-svg";
import HomeSvg from "../_svg-components/home-svg";
import Logo from "../_svg-components/logo";
import NavMenu from "./nav-menu";
import TagsNav from "./tags-nav";

export default function SideNav() {
  return (
    <aside
      className="w-full max-w-[272px] h-full px-4 pt-6 border-r-[1px] border-r-custom-neutral-200 dark:border-r-custom-neutral-800
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

      <TagsNav />
    </aside>
  );
}
