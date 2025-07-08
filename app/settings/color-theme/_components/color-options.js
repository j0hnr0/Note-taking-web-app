import ApplyChangesBtn from "../../_components/apply-changes-btn";
import TitleSubtitle from "../../_components/title-subtitle";
import DarkSvg from "../_svg-components/dark-svg";
import LightSvg from "../_svg-components/light-svg";
import SystemSvg from "../_svg-components/system-svg";
import Theme from "./theme";

export default function ColorOptions() {
  return (
    <form className="flex flex-col h-full py-5 px-6 w-full max-w-[562px]">
      <TitleSubtitle title="Color Theme" subtitle="Choose your color theme:" />

      <Theme
        svg={LightSvg}
        title="Light Mode"
        subtitle="Pick a clean and classic light theme"
      />
      <Theme
        svg={DarkSvg}
        title="Dark Mode"
        subtitle="Select a sleek and modern dark theme"
      />
      <Theme
        svg={SystemSvg}
        title="System"
        subtitle="Adapts to your device’s theme"
      />

      <ApplyChangesBtn />
    </form>
  );
}
