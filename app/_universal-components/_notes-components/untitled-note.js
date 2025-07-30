"use client";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function UntitledNote() {
  const title = useSelector((state) => state.notes.noteTitle);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`mt-4 p-2 w-full rounded-md bg-custom-neutral-100 dark:bg-custom-neutral-800 transform transition-all duration-300 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
      }`}
    >
      <h5 className="font-semibold text-base text-custom-neutral-950 dark:text-white truncate overflow-hidden">
        {title}
      </h5>
    </div>
  );
}
