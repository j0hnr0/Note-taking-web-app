import LogoutBtn from "@/app/_universal-components/_notes-components/logout-btn";
import NavMenu from "@/app/_universal-components/_notes-components/nav-menu";
import ColorThemeSvg from "@/app/_universal-components/_svg-components/color-theme-svg";
import FontSvg from "@/app/_universal-components/_svg-components/font-svg";
import LockSvg from "@/app/_universal-components/_svg-components/lock-svg";
import LogoutSvg from "@/app/_universal-components/_svg-components/logout-svg";

export default function Options() {
  return (
    <div className="w-full max-w-[290px] py-5 px-8 border-r-[1px] border-r-custom-neutral-200 dark:border-r-custom-neutral-800 h-full">
      <ul>
        <NavMenu svg={ColorThemeSvg} href="/settings/color-theme" noColor={true}>
          Color Theme
        </NavMenu>

        <NavMenu svg={FontSvg} href="/settings/font-theme" noColor={true}>
          Font Theme
        </NavMenu>

        <NavMenu svg={LockSvg} href="/settings/change-password" noColor={true}>
          Change Password
        </NavMenu>
      </ul>
      <hr className="mt-2 w-full border-t-[1px] border-custom-neutral-200 dark:border-custom-neutral-800" />
      <LogoutBtn svg={LogoutSvg}>Logout</LogoutBtn>
    </div>
  );
}
