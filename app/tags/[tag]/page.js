import Header from "@/app/_universal-components/_notes-components/header";
import MainContent from "@/app/_universal-components/_notes-components/main-content";
import MFloatingPlus from "@/app/_universal-components/_notes-components/mobile/m-floating-plus";
import MFooterMenu from "@/app/_universal-components/_notes-components/mobile/m-footer-menu";
import MHeader from "@/app/_universal-components/_notes-components/mobile/m-header";
import MNotesList from "@/app/_universal-components/_notes-components/mobile/m-notes-list";
import SideNav from "@/app/_universal-components/_notes-components/side-nav";

export default async function TagsPage({ params }) {
  const { tag } = await params;

  return (
    <div
      className="flex items-start h-screen
          max-custom-lg:block max-custom-lg:h-auto"
    >
      {/* This will only display when screen size is < 1024px */}
      <MHeader />
      <MNotesList />
      <MFooterMenu />
      <MFloatingPlus />
      {/* This will only display when screen size is < 1024px */}

      {/* This will only display when screen size is > 1024px*/}
      <SideNav />
      <div
        className="w-full h-full flex flex-col
            max-custom-lg:hidden"
      >
        <Header title={`Notes Tagged: ${tag}`} />
        <MainContent isInTagNotes={true} tagText={tag} />
      </div>
      {/* This will only display when screen size is > 1024px*/}
    </div>
  );
}
