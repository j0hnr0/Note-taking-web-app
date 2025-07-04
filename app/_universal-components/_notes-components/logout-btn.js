"use client";

import { useAuth } from "@/app/contexts/auth-provider";
import { useState } from "react";
import { LoadingSpinner } from "../_auth-components/auth-spinner";
import clsx from "clsx";

export default function LogoutBtn({ svg: Svg, children }) {
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);
    await logout();
  }

  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={handleLogout}
      className={clsx(
        "w-full px-3 py-2.5 rounded-lg flex justify-start items-center gap-2",
        {
          "cursor-not-allowed": isLoading,
          "cursor-pointer": !isLoading,
        }
      )}
    >
      {isLoading ? (
        <LoadingSpinner size="sm" color="primary" />
      ) : (
        <Svg fill="#2B303B" />
      )}
      <span className="inter font-medium text-sm text-custom-neutral-950">
        {isLoading ? "Logging out..." : children}
      </span>
    </button>
  );
}
