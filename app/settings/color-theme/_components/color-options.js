import DarkSvg from "../_svg-components/dark-svg";
import Theme from "./theme";

export default function ColorOptions() {
  return (
    <form className="flex flex-col h-full py-5 px-6 w-full max-w-[562px] border-r-[1px] border-r-custom-neutral-200">
      <small className="inter font-semibold text-base text-custom-neutral-950">
        Color Theme
      </small>
      <small className="mt-1 mb-3.5 inter font-normal text-sm text-custom-neutral-700">
        Choose your color theme:
      </small>

      <Theme svg={DarkSvg} title="Light Mode" subtitle="Pick a clean and classic light theme"  />
      <Theme svg={DarkSvg} title="Dark Mode" subtitle="Select a sleek and modern dark theme"  />
      <Theme svg={DarkSvg} title="System" subtitle="Adapts to your device’s theme"  />
    </form>
  );
}
