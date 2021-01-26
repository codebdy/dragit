import { createContext, useContext } from "react";
import { RxDragStore } from "./RxDragStore"

export const RxDragStoreContext = createContext<RxDragStore|undefined>(undefined);
export const RxDragStoreProvider = RxDragStoreContext.Provider;

const useRxDragStore = (): RxDragStore|undefined => useContext(RxDragStoreContext);

const useThemeOptions = () => useRxDragStore()?.themeOptions;

export {useRxDragStore, useThemeOptions};
