"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FontContext = createContext();

export function FontProvider({ children }) {
  const [selectedFont, setSelectedFont] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("font-preference") || "inter";
    }

    return "inter";
  });

  useEffect(() => {
    document.body.classList.remove("inter", "serif", "monospace");
    document.body.classList.add(selectedFont);

    localStorage.setItem("font-preference", selectedFont);
  }, [selectedFont]);

  return (
    <FontContext.Provider value={{ selectedFont, setSelectedFont }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);

  if (!context) {
    throw new Error("useFont must be used within FontProvider");
  }

  return context;
}
