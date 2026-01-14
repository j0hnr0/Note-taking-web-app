import Header from "../_universal-components/_notes-components/header";
import MainContent from "../_universal-components/_notes-components/main-content";
import MFooterMenu from "../_universal-components/_notes-components/mobile/m-footer-menu";
import MHeader from "../_universal-components/_notes-components/mobile/m-header";
import SideNav from "../_universal-components/_notes-components/side-nav";

export const dynamic = 'force-dynamic'

export default function ArchivedNotes() {
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
        <Header title="Archived Notes" />
        <MainContent isInArchivedNotes={true} />
      </div>
    </div>
  );
}
