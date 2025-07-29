"use client";

import { createContext, useContext, useState } from "react";

const FontContext = createContext();

export function FontProvider({ children }) {
  const [selectedFont, setSelectedFont] = useState("inter");

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
