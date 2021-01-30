import { IRxApp } from "Base/Model/IRxApp";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { useContext } from "react";
import { ThemeSettings } from "./ThemeSettings";
export class AppBoardStore{
  rxApp?: IRxApp;
  themeSettings: ThemeSettings = new ThemeSettings();

  constructor() {
    makeAutoObservable(this)
  }

  setRxApp(rxApp: IRxApp){
    this.rxApp = rxApp;
  }

}

export const AppBoardStoreContext = createContext<AppBoardStore>(new AppBoardStore());
export const AppBoardStoreProvider = AppBoardStoreContext.Provider;

export const useAppBoardStore = (): AppBoardStore => useContext(AppBoardStoreContext);
