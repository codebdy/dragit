import { IRxApp } from "Base/Model/IRxApp";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { useContext } from "react";
import { ID } from "rx-drag/models/baseTypes";
import { ThemeSettings } from "./ThemeSettings";
export class AppBoardStore{
  rootPageId?:string;
  rxApp?: IRxApp;
  themeSettings: ThemeSettings = new ThemeSettings();

  constructor() {
    makeAutoObservable(this)
  }

  setRootPageId(pageId?:string){
    this.rootPageId = pageId;
  }

  setRxApp(rxApp: IRxApp){
    this.rxApp = rxApp;
  }

  getPage(pageId?:ID){
    if(!pageId){
      return undefined;
    }
    const pages = this.rxApp?.pages;

    if(pages?.length){
      for(var i = 0; i < pages.length; i++){
        const page = pages[i];
        if(page.id === pageId){
          return page;
        }
      }
    }
  }

}

export const AppBoardStoreContext = createContext<AppBoardStore>(new AppBoardStore());
export const AppBoardStoreProvider = AppBoardStoreContext.Provider;

export const useAppBoardStore = (): AppBoardStore => useContext(AppBoardStoreContext);
