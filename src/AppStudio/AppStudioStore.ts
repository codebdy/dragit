import { IRxApp } from "Base/Model/IRxApp";
import { IRxPage } from "Base/Model/IRxPage";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { useContext } from "react";
import { DARK, ThemeMode } from "Store/ThemeSettings";

export class AppStudioStore{
  verticalBarWidth:string = '60px';
  isDirty:boolean = false;
  themeMode:ThemeMode = DARK;
  editingPage?:IRxPage;
  rxApp?: IRxApp;

  constructor() {
    makeAutoObservable(this)
  }

  setRxApp(rxApp: IRxApp){
    this.rxApp = rxApp;
    if(rxApp?.pages?.length){
      this.editingPage = rxApp.pages[0];
    }
  }

  setEditingPage(page?:IRxPage){
    this.editingPage = page;
  }
}

export const AppStudioStoreContext = createContext<AppStudioStore|undefined>(undefined);
export const AppStudioStoreProvider = AppStudioStoreContext.Provider;

export const useAppStudioStore = (): AppStudioStore|undefined => useContext(AppStudioStoreContext);
