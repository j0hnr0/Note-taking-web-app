"use client";

import { useEffect, useState } from "react";
import ApplyChangesBtn from "../../_components/apply-changes-btn";
import TitleSubtitle from "../../_components/title-subtitle";
import DarkSvg from "../_svg-components/dark-svg";
import LightSvg from "../_svg-components/light-svg";
import SystemSvg from "../_svg-components/system-svg";
import Theme from "./theme";
import { useTheme } from "next-themes";

export default function ColorOptions() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [theme]);

  function handleTheme(e) {
    e.preventDefault();
    setTheme(selectedTheme);
  }

  if (!mounted) {
    return null;
  }

  return (
    <form
      onSubmit={handleTheme}
      className="flex flex-col h-full py-5 px-6 w-full max-w-[562px]"
    >
      <TitleSubtitle title="Color Theme" subtitle="Choose your color theme:" />

      <Theme
        svg={LightSvg}
        title="Light Mode"
        subtitle="Pick a clean and classic light theme"
        name="theme-selection"
        value="light"
        checked={selectedTheme === "light"}
        onChange={(e) => setSelectedTheme(e.target.value)}
      />
      <Theme
        svg={DarkSvg}
        title="Dark Mode"
        subtitle="Select a sleek and modern dark theme"
        name="theme-selection"
        value="dark"
        checked={selectedTheme === "dark"}
        onChange={(e) => setSelectedTheme(e.target.value)}
      />
      <Theme
        svg={SystemSvg}
        title="System"
        subtitle="Adapts to your device’s theme"
        name="theme-selection"
        value="system"
        checked={selectedTheme === "system"}
        onChange={(e) => setSelectedTheme(e.target.value)}
      />

      <ApplyChangesBtn text="Apply Changes" />
    </form>
  );
}
