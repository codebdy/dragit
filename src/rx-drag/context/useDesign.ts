import { createContext, useContext } from "react";
import { RxDragCoreStore } from "./RxDragCoreStore"

export const RxDragCoreStoreContext = createContext<RxDragCoreStore|undefined>(undefined);
export const RxDragCoreStoreProvider = RxDragCoreStoreContext.Provider;

const useRxDragCoreStore = (): RxDragCoreStore|undefined => useContext(RxDragCoreStoreContext);

export function useDesign(){
  const rxDragCoreStore = useRxDragCoreStore();
  return {isDesigning:!!rxDragCoreStore, rxDragCoreStore}
}