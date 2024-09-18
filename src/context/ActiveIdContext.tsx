import { createContext } from "react";
import { useActiveId } from "../lib/hooks";

export type ActiveIdContextType = {
  activeId: number | null;
};

export const ActiveIdContext = createContext<ActiveIdContextType | null>(null);

export function ActiveIdContextProvider({ children }: { children: React.ReactNode }) {
  const activeId = useActiveId();

  return <ActiveIdContext.Provider value={{ activeId }}>{children}</ActiveIdContext.Provider>;
}
