"use client";

import { useToggle } from "@/app/contexts/toggle-provider";
import clsx from "clsx";

export default function Button({ type, btnText, textColor, bgColor, maxWidth, isLoading }) {
  const { toggleCreateNewNote } = useToggle();

  return (
    <button
      type={type}
      onClick={toggleCreateNewNote}
      disabled={isLoading}
      className={clsx(
        `w-full ${maxWidth} py-3 text-center rounded-lg`,
        isLoading
          ? "bg-gray-400 cursor-not-allowed"
          : `${bgColor} cursor-pointer`
      )}
    >
      <h5 className={`inter font-medium text-sm ${textColor}`}>
        {isLoading ? (
          <span className="mr-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          btnText
        )}
      </h5>
    </button>
  );
}
