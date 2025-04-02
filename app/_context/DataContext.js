"use client";

import { createContext, useState } from "react";

export const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [isForgotClicked, setIsForgotClicked] = useState(false);

  function updateIsForgot() {
    setIsForgotClicked((prevState) => !prevState);
  }

  const value = {
    isForgotClicked,
    updateIsForgot,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
