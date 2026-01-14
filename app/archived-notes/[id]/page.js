import Header from "@/app/_universal-components/_notes-components/header";
import MFloatingPlus from "@/app/_universal-components/_notes-components/mobile/m-floating-plus";
import MFooterMenu from "@/app/_universal-components/_notes-components/mobile/m-footer-menu";
import MHeader from "@/app/_universal-components/_notes-components/mobile/m-header";
import NoteSettings from "@/app/_universal-components/_notes-components/note-settings";
import NotesList from "@/app/_universal-components/_notes-components/notes-list";
import SideNav from "@/app/_universal-components/_notes-components/side-nav";
import UpdateNoteForm from "@/app/_universal-components/_notes-components/update-note-form";

export default async function ArchivePage({ params }) {
  const { id } = await params;

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
        <Header title="Archived Notes" />
        <div className="flex justify-start items-start h-full">
          <NotesList isInArchivedNotes={true} />
          <UpdateNoteForm id={id} isInArchivedNotes={true} />
          <NoteSettings id={id} isInArchivedNotes={true} />
        </div>
      </div>
    </div>
  );
}
