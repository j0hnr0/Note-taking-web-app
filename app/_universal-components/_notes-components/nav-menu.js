"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ChevronRight from "../_svg-components/chevron-right";

export default function NavMenu({ svg: Svg, href, children }) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <li className="mb-1">
      <Link
        href={href}
        className={clsx(
          "w-full px-3 py-2.5 rounded-lg flex justify-between items-center",
          {
            "bg-custom-neutral-100": isActive,
          }
        )}
      >
        <div className="flex justify-start items-center gap-2">
          <div
            className={clsx({
              "text-custom-blue-500": isActive,
              "text-custom-neutral-700": !isActive,
            })}
          >
            <Svg fill={isActive ? "#335CFF" : "#2B303B"} />
          </div>
          <span className="inter font-medium text-sm text-custom-neutral-950">
            {children}
          </span>
        </div>
        {isActive && <ChevronRight />}
      </Link>
    </li>
  );
}