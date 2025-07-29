"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Theme({
  svg: Svg,
  title,
  subtitle,
  name,
  value,
  checked,
  onChange,
}) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <label className="mt-4 w-full max-w-[528px] rounded-xl border-[1px] border-custom-neutral-200 dark:border-custom-neutral-800 p-4 flex justify-between items-center cursor-pointer has-[:checked]:bg-custom-neutral-100 has-[:checked]:dark:bg-custom-neutral-800 has-[:checked]:dark:border-custom-neutral-700">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />

      <div className="flex justify-start items-center gap-4">
        <div className="rounded-xl bg-white dark:bg-custom-neutral-950 border-[1px] border-custom-neutral-200 dark:border-custom-neutral-700 p-2">
          <Svg fill={resolvedTheme === "dark" ? "#FFFFFF" : "#0E121B"} />
        </div>

        <div>
          <strong className=" font-medium text-sm text-custom-neutral-950 dark:text-white">
            {title}
          </strong>
          <small className="block mt-1.5  font-normal text-xs text-custom-neutral-700 dark:text-custom-neutral-300">
            {subtitle}
          </small>
        </div>
      </div>

      <div className="w-4 h-4 rounded-full border-2 border-custom-neutral-200 dark:border-custom-neutral-600 peer-checked:border-custom-blue-500 peer-checked:bg-custom-blue-500 relative transition-[border-color,background-color] duration-300">
        <div className="absolute inset-0 m-0.5 bg-white dark:bg-custom-neutral-800 rounded-full"></div>
      </div>
    </label>
  );
}
