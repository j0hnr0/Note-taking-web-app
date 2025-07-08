import ApplyChangesBtn from "../../_components/apply-changes-btn";
import TitleSubtitle from "../../_components/title-subtitle";
import MonoSvg from "../_svg-components/mono-svg";
import SansSerifSvg from "../_svg-components/sans-serif-svg";
import SerifSvg from "../_svg-components/serif-svg";
import Theme from "./theme";

export default function FontOptions() {
  return (
    <form className="flex flex-col h-full py-5 px-6 w-full max-w-[562px]">
      <TitleSubtitle title="Font Theme" subtitle="Choose your font theme:" />

      <Theme
        svg={SansSerifSvg}
        title="Sans-serif"
        subtitle="Clean and modern, easy to read."
      />
      <Theme
        svg={SerifSvg}
        title="Serif"
        subtitle="Classic and elegant for a timeless feel."
      />
      <Theme
        svg={MonoSvg}
        title="Monospace"
        subtitle="Code-like, great for a technical vibe."
      />

      <ApplyChangesBtn />
    </form>
  );
}
