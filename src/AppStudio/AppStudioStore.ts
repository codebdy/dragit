import { IRxApp } from "Base/Model/IRxApp";
import { IRxPage } from "Base/Model/IRxPage";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { useContext } from "react";
import { DARK, RxThemeMode } from "rx-drag/store/IRxThemeOptions";
import { PageEditorStore } from "./RxPageEditor/PageEditorStore";

export class AppStudioStore{
  verticalBarWidth:string = '60px';
  isDirty:boolean = false;
  themeMode:RxThemeMode = DARK;
  //editingPage?:IRxPage;
  editingNavigation?:boolean;
  rxApp?: IRxApp;

  pageEditor?:PageEditorStore;

  constructor() {
    makeAutoObservable(this)
  }

  setRxApp(rxApp: IRxApp){
    this.rxApp = rxApp;
    if(rxApp?.pages?.length && ! this.pageEditor){
      this.editPage(rxApp.pages[0]);
    }
  }

  editPage(page?:IRxPage){
    if(page){
      this.pageEditor = new PageEditorStore(page);
    }
    else{
      this.pageEditor = undefined;
    }

    this.editingNavigation = false;
  }

  editNavigation(){
    this.pageEditor = undefined;
    this.editingNavigation = true;
  }

  setThemeMode(mode:RxThemeMode){
    this.themeMode = mode;
  }
}

export const AppStudioStoreContext = createContext<AppStudioStore|undefined>(undefined);
export const AppStudioStoreProvider = AppStudioStoreContext.Provider;

export const useAppStudioStore = (): AppStudioStore|undefined => useContext(AppStudioStoreContext);
