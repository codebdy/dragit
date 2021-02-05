import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { IPageAction } from "../Model/IPageAction";

export class ActionStore{
  waitingActions:Array<IPageAction> = [];

  constructor() {
    makeAutoObservable(this)
  }

  hasAction() {
    return this.waitingActions.length > 0;
  }

  emit(action:IPageAction){
    this.waitingActions.push(action);
  }
  
  popAction(){
    return this.waitingActions.pop();
  }
}

export const ActionStoreContext = createContext<ActionStore|undefined>(undefined);
export const ActionStoreProvider = ActionStoreContext.Provider;

export const useActionStore = (): ActionStore|undefined => useContext(ActionStoreContext);