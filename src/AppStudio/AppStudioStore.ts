import { IRxApp } from "Base/Model/IRxApp";
import { IRxPage } from "Base/Model/IRxPage";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { useContext } from "react";
import { LIGHT, RxThemeMode } from "rx-drag/context/IRxThemeOptions";

export class WorkSpaceState{
  constructor() {
    makeAutoObservable(this)
  }
}

export class AppStudioStore{
  verticalBarWidth:string = '60px';
  isDirty:boolean = false;
  themeMode:RxThemeMode = LIGHT;
  editingPage?:IRxPage;
  editingNavigation?:boolean;
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

  editPage(page?:IRxPage){
    this.editingPage = page;
    this.editingNavigation = false;
  }

  editNavigation(){
    this.editingPage = undefined;
    this.editingNavigation = true;
  }

  setThemeMode(mode:RxThemeMode){
    this.themeMode = mode;
  }
}

export const AppStudioStoreContext = createContext<AppStudioStore|undefined>(undefined);
export const AppStudioStoreProvider = AppStudioStoreContext.Provider;

export const useAppStudioStore = (): AppStudioStore|undefined => useContext(AppStudioStoreContext);
