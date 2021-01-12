import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { PageAction } from "./PageAction";

export class ActionStore{
  waitingActions:Array<PageAction> = [];

  constructor() {
    makeAutoObservable(this)
  }

  emit(action:PageAction){
    this.waitingActions.push(action);
  }
  
  popAction(){
    return this.waitingActions.pop();
  }
}

export const ActionStoreContext = createContext<ActionStore|undefined>(undefined);
export const ActionStoreProvider = ActionStoreContext.Provider;

export const useActionStore = (): ActionStore|undefined => useContext(ActionStoreContext);