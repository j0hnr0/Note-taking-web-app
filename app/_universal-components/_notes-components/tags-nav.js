import TagsSvg from "../_svg-components/tags-svg";
import NavMenu from "./nav-menu";

export default function TagsNav() {
  return (
    <nav className="mt-2">
      <ul>
        <NavMenu svg={TagsSvg} href="/tags/dev">
          Dev
        </NavMenu>
      </ul>
    </nav>
  );
}
