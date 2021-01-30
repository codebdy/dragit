import { IRxApp } from "Base/Model/IRxApp";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { useContext } from "react";
export class AppBoardStore{
  rxApp?: IRxApp;

  constructor() {
    makeAutoObservable(this)
  }

  setRxApp(rxApp: IRxApp){
    this.rxApp = rxApp;
  }

}

export const AppBoardStoreContext = createContext<AppBoardStore|undefined>(undefined);
export const AppBoardStoreProvider = AppBoardStoreContext.Provider;

export const useAppBoardStore = (): AppBoardStore|undefined => useContext(AppBoardStoreContext);
