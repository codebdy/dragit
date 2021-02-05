import { RXModel } from "Base/ModelTree/RXModel";
import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

export class DebugStore{
  selectedModel?:RXModel;

  constructor() {
    makeAutoObservable(this)
  }

  setSelectedModel(selectedModel?:RXModel){
    this.selectedModel = selectedModel;
  }
}

export const DebugStoreContext = createContext<DebugStore|undefined>(undefined);
export const DebugStoreProvider = DebugStoreContext.Provider;
export const useDebugStore = (): DebugStore|undefined => useContext(DebugStoreContext);