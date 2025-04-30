"use client";

import { useAuth } from "../contexts/auth-provider";

export default function AllNotes() {
  const { logout } = useAuth();

  return (
    <button onClick={logout} className="cursor-pointer border-2 border-black">
      LOGOUT
    </button>
  );
}
