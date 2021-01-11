import { createContext, useContext } from "react";
import { CanvasStore } from "./CanvasStore"

export const CanvasStoreContext = createContext<CanvasStore|undefined>(undefined);
export const CanvasStoreProvider = CanvasStoreContext.Provider;

const useCanvasStore = (): CanvasStore|undefined => useContext(CanvasStoreContext);

export function useDesign(){
  const canvasStore = useCanvasStore();
  return {isDesigning:!!canvasStore, canvasStore}
}