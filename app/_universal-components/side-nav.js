import ArchiveSvg from "./_svg-components/archive-svg";
import HomeSvg from "./_svg-components/home-svg";
import Logo from "./logo";
import NavMenu from "./nav-menu";

export default function SideNav() {
  return (
    <aside className="w-full max-w-[272px] h-screen px-4 pt-6 border-[1px] border-r-custom-neutral-200">
      <Logo />
      <nav className="mt-7">
        <ul>
          <NavMenu svg={HomeSvg} href="/all-notes">All Notes</NavMenu>
          <NavMenu svg={ArchiveSvg} href="/">Archived Notes</NavMenu>
        </ul>
      </nav>
    </aside>
  );
}
