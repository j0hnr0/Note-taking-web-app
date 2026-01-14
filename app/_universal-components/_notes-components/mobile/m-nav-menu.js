"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MNavMenu({ label, svg: Svg, href }) {
  const pathname = usePathname();

  return (
    <li className="w-full max-w-20">
      <Link href={href}>
        <div
          className={clsx("py-1 rounded-sm flex flex-col items-center gap-1", {
            "bg-custom-blue-50 dark:bg-custom-neutral-800": pathname === href,
          })}
        >
          <Svg fill={pathname === href ? "#335CFF" : "#525866"} width="24" height="24" />
          <span
            className={clsx("max-custom-sm:hidden block font-normal text-xs", {
              "text-custom-blue-500": pathname === href,
              "text-custom-neutral-600": pathname !== href,
            })}
          >
            {label}
          </span>
        </div>
      </Link>
    </li>
  );
}
