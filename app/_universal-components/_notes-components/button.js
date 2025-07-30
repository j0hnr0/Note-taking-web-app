"use client";

import { openNoteEditor } from "@/app/all-notes/store/notes-slice";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function Button({
  type,
  btnText,
  textColor,
  bgColor,
  maxWidth,
  toggle,
  isLoading,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  function navigate() {
    if (btnText === "+ Create New Note") {
      if (pathname.startsWith("/all-notes") && pathname !== "/all-notes") {
        router.push("/all-notes");
      } else if (
        pathname.startsWith("/archived-notes") &&
        pathname !== "/archived-notes"
      ) {
        router.push("/archived-notes");
      }
    }
  }

  return (
    <button
      type={type}
      onClick={
        type === "button"
          ? () => {
              navigate();
              dispatch(openNoteEditor(toggle));
            }
          : undefined
      }
      disabled={isLoading}
      className={clsx(
        `w-full ${maxWidth} py-3 text-center rounded-lg`,
        isLoading
          ? "bg-gray-400 cursor-not-allowed"
          : `${bgColor} cursor-pointer`
      )}
    >
      <h5 className={`font-medium text-sm ${textColor}`}>
        {isLoading ? (
          <span className="mr-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          btnText
        )}
      </h5>
    </button>
  );
}
