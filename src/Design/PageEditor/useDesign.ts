import { createContext, useContext } from "react";
import { PageEditorStore } from "./PageEditorStore"

export const PageEditorStoreContext = createContext<PageEditorStore|undefined>(undefined);
export const PageEditorStoreProvider = PageEditorStoreContext.Provider;

const usePageEditorStore = (): PageEditorStore|undefined => useContext(PageEditorStoreContext);

export function useDesign(){
  const eidtorStore = usePageEditorStore();
  return {isDesigning:!!eidtorStore, eidtorStore}
}