import Header from "@/app/_universal-components/_notes-components/header";
import MFooterMenu from "@/app/_universal-components/_notes-components/mobile/m-footer-menu";
import MHeader from "@/app/_universal-components/_notes-components/mobile/m-header";
import SideNav from "@/app/_universal-components/_notes-components/side-nav";
import Options from "../_components/options";
import ColorOptions from "./_components/color-options";

export const dynamic = 'force-dynamic'

export default function ColorTheme() {
  return (
    <div
      className="flex items-start h-screen
            max-custom-lg:block max-custom-lg:h-auto"
    >
      {/* Mobile-only UI elements */}
      <MHeader />
      <MFooterMenu />

      {/* Desktop sidebar - hidden on mobile */}
      <SideNav />

      {/* Main content - visible on both mobile and desktop */}
      <div className="w-full h-full flex flex-col">
        <Header title="Settings" />
        <div className="flex justify-start items-start h-full max-custom-sm:flex-col">
          <Options />
          <ColorOptions />
        </div>
      </div>
    </div>
  );
}
