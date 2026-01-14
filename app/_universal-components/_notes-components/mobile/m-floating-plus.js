"use client";

import { useDispatch } from "react-redux";
import { openNoteEditor } from "@/app/all-notes/store/notes-slice";
import PlusSvg from "../../_svg-components/plus-svg";

export default function MFloatingPlus() {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(openNoteEditor("open"))}
      className="max-custom-lg:block hidden fixed bottom-[106px] right-9 z-50
      max-custom-sm:right-4 max-custom-sm:bottom-[72px]"
    >
      <div className="rounded-full bg-custom-blue-500 flex justify-center items-center p-6 shadow-[0_7px_11px_0_rgba(202,207,216,0.7)]
      max-custom-sm:p-3.5">
        <PlusSvg />
      </div>
    </button>
  );
}
