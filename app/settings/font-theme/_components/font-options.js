"use client";

import { useFont } from "@/app/contexts/font-context";
import ApplyChangesBtn from "../../_components/apply-changes-btn";
import TitleSubtitle from "../../_components/title-subtitle";
import MonoSvg from "../_svg-components/mono-svg";
import SansSerifSvg from "../_svg-components/sans-serif-svg";
import SerifSvg from "../_svg-components/serif-svg";
import Theme from "./theme";
import { useEffect, useState } from "react";

export default function FontOptions() {
  const { selectedFont, setSelectedFont } = useFont();
  const [localSelectedFont, setLocalSelectedFont] = useState(selectedFont);

  useEffect(() => {
    setLocalSelectedFont(selectedFont);
  }, [selectedFont])

  function handleFont(e) {
    e.preventDefault();

    setSelectedFont(localSelectedFont);
  }

  return (
    <form
      onSubmit={handleFont}
      className="flex flex-col h-full py-5 px-6 w-full max-w-[562px] max-custom-md:max-w-full"
    >
      <TitleSubtitle title="Font Theme" subtitle="Choose your font theme:" />

      <Theme
        svg={SansSerifSvg}
        title="Sans-serif"
        subtitle="Clean and modern, easy to read."
        name="font-selection"
        value="inter"
        checked={localSelectedFont  === "inter"}
        onChange={(e) => setLocalSelectedFont(e.target.value)}
      />
      <Theme
        svg={SerifSvg}
        title="Serif"
        subtitle="Classic and elegant for a timeless feel."
        name="font-selection"
        value="serif"
        checked={localSelectedFont === "serif"}
        onChange={(e) => setLocalSelectedFont(e.target.value)}
      />
      <Theme
        svg={MonoSvg}
        title="Monospace"
        subtitle="Code-like, great for a technical vibe."
        name="font-selection"
        value="monospace"
        checked={localSelectedFont === "monospace"}
        onChange={(e) => setLocalSelectedFont(e.target.value)}
      />

      <ApplyChangesBtn text="Apply Changes" />
    </form>
  );
}
