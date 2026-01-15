import Header from "@/app/_universal-components/_notes-components/header";
import MFooterMenu from "@/app/_universal-components/_notes-components/mobile/m-footer-menu";
import MHeader from "@/app/_universal-components/_notes-components/mobile/m-header";
import NoteSettings from "@/app/_universal-components/_notes-components/note-settings";
import NotesList from "@/app/_universal-components/_notes-components/notes-list";
import SideNav from "@/app/_universal-components/_notes-components/side-nav";
import UpdateNoteForm from "@/app/_universal-components/_notes-components/update-note-form";
import { getUserNoteById } from "@/app/lib/note-service";

export default async function singleTagPage({ params }) {
  const { tag, id } = await params;
  const note = await getUserNoteById({ id });

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
        <Header title={`Notes Tagged: ${tag}`} />
        <div className="flex justify-start items-start h-full max-custom-sm:flex-col">
          <NotesList isInTagNotes={true} tagText={tag} />
          <UpdateNoteForm id={id} />
          <NoteSettings id={id} isInArchivedNotes={note?.isArchive} />
        </div>
      </div>
    </div>
  );
}
