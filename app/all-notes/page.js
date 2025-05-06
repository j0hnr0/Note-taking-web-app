"use client";

import Header from "../_universal-components/_notes-components/header";
import SideNav from "../_universal-components/_notes-components/side-nav";
// import { useAuth } from "../contexts/auth-provider";

export default function AllNotes() {
  // const { logout } = useAuth();

  return (
    <div className="flex items-start">
      <SideNav />
      <Header />
      {/* <div>
        <button
          onClick={logout}
          className="cursor-pointer border-2 border-black"
        >
          LOGOUT
        </button>
      </div> */}
    </div>
  );
}
