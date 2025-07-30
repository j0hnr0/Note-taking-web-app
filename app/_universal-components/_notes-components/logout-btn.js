"use client";

import { useAuth } from "@/app/contexts/auth-provider";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../_auth-components/auth-spinner";
import clsx from "clsx";
import { useTheme } from "next-themes";

export default function LogoutBtn({ svg: Svg, children }) {
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleLogout() {
    setIsLoading(true);
    await logout();
  }

  if (!mounted) return null;

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
        <Svg fill={resolvedTheme === "dark" ? "#E0E4EA" : "#0E121B"} />
      )}
      <span className=" font-medium text-sm text-custom-neutral-950 dark:text-custom-neutral-200">
        {isLoading ? "Logging out..." : children}
      </span>
    </button>
  );
}
