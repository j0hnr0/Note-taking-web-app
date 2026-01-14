import Header from "@/app/_universal-components/_notes-components/header";
import MFloatingPlus from "@/app/_universal-components/_notes-components/mobile/m-floating-plus";
import MFooterMenu from "@/app/_universal-components/_notes-components/mobile/m-footer-menu";
import MHeader from "@/app/_universal-components/_notes-components/mobile/m-header";
import NoteSettings from "@/app/_universal-components/_notes-components/note-settings";
import NotesList from "@/app/_universal-components/_notes-components/notes-list";
import SideNav from "@/app/_universal-components/_notes-components/side-nav";
import UpdateNoteForm from "@/app/_universal-components/_notes-components/update-note-form";

export default async function NotePage({ params }) {
  const { id } = await params;

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
        <Header title="All Notes" />
        <div className="flex justify-start items-start h-full max-custom-sm:flex-col">
          <NotesList />
          <UpdateNoteForm id={id} />
          <NoteSettings id={id} />
        </div>
      </div>
    </div>
  );
}
