"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ChevronRight from "../_svg-components/chevron-right";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function NavMenu({ svg: Svg, href, children, noColor }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <li className="mb-1">
      <Link
        href={href}
        className={clsx(
          "w-full px-3 py-2.5 rounded-lg flex justify-between items-center",
          {
            "bg-custom-neutral-100 dark:bg-custom-neutral-800": isActive,
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
            <Svg
              fill={
                isActive
                  ? noColor
                    ? resolvedTheme === "dark" ? "#335CFF" : "#2B303B"
                    : "#335CFF"
                  : resolvedTheme === "dark"
                  ? "#E0E4EA"
                  : "#2B303B"
              }
            />
          </div>
          <span className="inter font-medium text-sm text-custom-neutral-950 dark:text-neutral-200">
            {children}
          </span>
        </div>
        {isActive && <ChevronRight />}
      </Link>
    </li>
  );
}
