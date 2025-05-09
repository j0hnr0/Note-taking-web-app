import Header from "../_universal-components/_notes-components/header";
import MHeader from "../_universal-components/_notes-components/mobile/m-header";
import MNotesList from "../_universal-components/_notes-components/mobile/m-notes-list";
import NotesList from "../_universal-components/_notes-components/notes-list";
import SideNav from "../_universal-components/_notes-components/side-nav";

export default function AllNotes() {
  return (
    <div
      className="flex items-start h-screen
    max-custom-lg:block max-custom-lg:h-auto"
    >
      {/* This will only display when screen size is < 1024px */}
      <MHeader />
      <MNotesList />
      {/* This will only display when screen size is < 1024px */}

      {/* This will only display when screen size is > 1024px*/}
      <SideNav />
      <div
        className="w-full h-full flex flex-col
      max-custom-lg:hidden"
      >
        <Header />
        <div className="h-full">
          <NotesList />
        </div>
      </div>
      {/* This will only display when screen size is > 1024px*/}
    </div>
  );
}
