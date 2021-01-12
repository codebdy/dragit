import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { PageAction } from "./PageAction";

export class ActionStore{
  waitingActions:Array<PageAction> = [];

  constructor() {
    makeAutoObservable(this)
  }
}

export const ActionStoreContext = createContext<ActionStore|undefined>(undefined);
export const ActionStoreProvider = ActionStoreContext.Provider;

export const useActionStore = (): ActionStore|undefined => useContext(ActionStoreContext);