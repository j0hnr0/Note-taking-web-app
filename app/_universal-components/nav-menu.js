"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMenu({ svg: Svg, href, children }) {
  const pathname = usePathname();

  return (
    <li className="mb-1">
      <Link
        href={href}
        className={clsx(
          "w-full px-3 py-2.5 rounded-lg flex justify-between items-center",
          {
            "bg-custom-neutral-100": pathname === href,
          }
        )}
      >
        <div className="flex justify-start items-center gap-2">
          <div className="text-red-500">
            <Svg />
          </div>
          <span className="inter font-medium text-sm text-custom-neutral-950">
            {children}
          </span>
        </div>
      </Link>
    </li>
  );
}
