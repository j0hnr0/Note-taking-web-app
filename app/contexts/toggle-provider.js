"use client";

import { createContext, useContext, useState } from "react";

const ToggleContext = createContext(null);

export function ToggleProvider({ children }) {
  const [isCreateNewNoteOpen, setIsCreateNewNoteOpen] = useState(false);

  const toggleCreateNewNote = () => {
    setIsCreateNewNoteOpen((prev) => !prev);
  };

  const value = {
    isCreateNewNoteOpen,
    toggleCreateNewNote,
  };

  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  );
}

export function useToggle() {
  const context = useContext(ToggleContext);
  if (context === null) {
    throw new Error("useToggle must be used within a ToggleProvider");
  }

  return context;
}
