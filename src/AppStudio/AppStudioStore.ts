import { ID } from "Base/Model/graphqlTypes";
import { IRxApp } from "Base/Model/IRxApp";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { useContext } from "react";
import { DARK, ThemeMode } from "Store/ThemeSettings";

export class AppStudioStore{
  verticalBarWidth:string = '60px';
  isDirty:boolean = false;
  themeMode:ThemeMode = DARK;
  editingPageId?:string;
  rxApp?: IRxApp;

  constructor() {
    makeAutoObservable(this)
  }

  setRxApp(rxApp: IRxApp){
    this.rxApp = rxApp;
    if(rxApp?.pages?.length){
      this.editingPageId = rxApp.pages[0].id;
    }
  }

  setEditingPageId(pageId:ID){
    this.editingPageId = pageId;
  }
}

export const AppStudioStoreContext = createContext<AppStudioStore|undefined>(undefined);
export const AppStudioStoreProvider = AppStudioStoreContext.Provider;

export const useAppStudioStore = (): AppStudioStore|undefined => useContext(AppStudioStoreContext);
