"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMenu({ href, children }) {
  const pathname = usePathname();

  return (
    <li className="mb-1">
      <Link
        href={href}
        className={clsx(
          "w-full block px-3 py-2.5 rounded-lg inter font-medium text-sm text-custom-neutral-950",
          {
            "bg-custom-neutral-100": pathname === href,
          }
        )}
      >
        {children}
      </Link>
    </li>
  );
}
