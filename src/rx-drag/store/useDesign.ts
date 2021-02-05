import { createContext, useContext } from "react";
import { RxDragStore } from "./RxDragStore"

export const RxDragStoreContext = createContext<RxDragStore|undefined>(undefined);
export const RxDragStoreProvider = RxDragStoreContext.Provider;

export const useRxDragStore = (): RxDragStore|undefined => useContext(RxDragStoreContext);

export function useDesign(){
  const rxDragStore = useRxDragStore();
  return {isDesigning:!!rxDragStore, rxDragStore}
}