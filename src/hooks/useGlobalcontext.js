import { useContext } from "react";
import { ContextProvider } from "../context/GlobalContextProvider";
export function useGlobalcontext() {
  const context = useContext(ContextProvider);

  if (!context) {
    throw new Error("Contextdan tashqarida ishlatilgan");
  }

  return context;
}
