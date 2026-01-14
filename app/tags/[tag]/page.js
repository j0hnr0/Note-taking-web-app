import Header from "@/app/_universal-components/_notes-components/header";
import MainContent from "@/app/_universal-components/_notes-components/main-content";
import MFloatingPlus from "@/app/_universal-components/_notes-components/mobile/m-floating-plus";
import MFooterMenu from "@/app/_universal-components/_notes-components/mobile/m-footer-menu";
import MHeader from "@/app/_universal-components/_notes-components/mobile/m-header";
import SideNav from "@/app/_universal-components/_notes-components/side-nav";

export default async function TagsPage({ params }) {
  const { tag } = await params;

  return (
    <div
      className="flex items-start h-screen
          max-custom-lg:block max-custom-lg:h-auto"
    >
      {/* Mobile-only UI elements */}
      <MHeader />
      <MFooterMenu />
      <MFloatingPlus />

      {/* Desktop sidebar - hidden on mobile */}
      <SideNav />

      {/* Main content - visible on both mobile and desktop */}
      <div className="w-full h-full flex flex-col">
        <Header title={`Notes Tagged: ${tag}`} />
        <MainContent isInTagNotes={true} tagText={tag} />
      </div>
    </div>
  );
}
