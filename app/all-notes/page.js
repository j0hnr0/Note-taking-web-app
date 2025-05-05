"use client";

import SideNav from "../_universal-components/side-nav";
import { useAuth } from "../contexts/auth-provider";

export default function AllNotes() {
  const { logout } = useAuth();

  return (
    <div className="flex">
      <SideNav />
      <div>
        <button
          onClick={logout}
          className="cursor-pointer border-2 border-black"
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}
