"use client";

import Header from "../_universal-components/_notes-components/header";
import NotesList from "../_universal-components/_notes-components/notes-list";
import SideNav from "../_universal-components/_notes-components/side-nav";

export default function AllNotes() {
  return (
    <div className="flex items-start h-screen">
      <SideNav />
      <div className="w-full h-full flex flex-col">
        <Header />
        <div className="h-full">
          <NotesList />
        </div>
      </div>
    </div>
  );
}
