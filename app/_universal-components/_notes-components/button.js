"use client";

import { useToggle } from "@/app/contexts/toggle-provider";
import clsx from "clsx";

export default function Button({ btnText, isLoading }) {
  const { toggleCreateNewNote } = useToggle();

  return (
    <button
      type="button"
      onClick={toggleCreateNewNote}
      disabled={isLoading}
      className={clsx("w-full py-3 text-center rounded-lg", {
        "bg-custom-blue-500 cursor-pointer": !isLoading,
        "bg-gray-400 cursor-not-allowed": isLoading,
      })}
    >
      <h5 className="inter font-medium text-sm text-white">
        {isLoading ? (
          <span className="mr-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          btnText
        )}
      </h5>
    </button>
  );
}
