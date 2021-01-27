import { createContext, useContext } from "react";
import { RxDragShellStore } from "./RxDragShellStore"

export const RxDragShellStoreContext = createContext<RxDragShellStore|undefined>(undefined);
export const RxDragShellStoreProvider = RxDragShellStoreContext.Provider;

const useRxDragShellStore = (): RxDragShellStore|undefined => useContext(RxDragShellStoreContext);

const useThemeOptions = () => useRxDragShellStore()?.themeOptions;

export {useRxDragShellStore, useThemeOptions};
