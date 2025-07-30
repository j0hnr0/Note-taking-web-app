"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FontContext = createContext();

export function FontProvider({ children }) {
  const [selectedFont, setSelectedFont] = useState("monospace");

  useEffect(() => {
    document.body.classList.remove('inter', 'serif', 'monospace');

    document.body.classList.add(selectedFont);
  }, [selectedFont])

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
