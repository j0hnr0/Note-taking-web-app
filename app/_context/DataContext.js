"use client";

import { createContext, useCallback, useState } from "react";

export const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [isForgotClicked, setIsForgotClicked] = useState(false);

  const updateIsForgot = useCallback(() => {
    setIsForgotClicked((prevState) => !prevState);
  }, []);

  const value = {
    isForgotClicked,
    updateIsForgot,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
