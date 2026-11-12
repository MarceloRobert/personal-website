"use client";

// For a better understanding, check https://react.dev/reference/react/useContext
import { createContext, useContext, useState } from "react";

type GridContextValue = {
  gridEnabled: boolean;
  setGridEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

const GridContext = createContext<GridContextValue | null>(null);

export const GridProvider = ({ children }: { children: React.ReactNode }) => {
  const [gridEnabled, setGridEnabled] = useState(true);

  return (
    <GridContext.Provider value={{ gridEnabled, setGridEnabled }}>
      {children}
    </GridContext.Provider>
  );
};

// This custom hook is not strictly necessary but it is useful to check if the context can exist (if it's inside a provider)
// If not using this custom hook we would have to export the context itself and make this check manually if we wanted
export function useGrid() {
  const context = useContext(GridContext);

  if (!context) {
    throw new Error("useGrid must be used within a GridProvider");
  }

  return context;
}
