import { IRxApp } from "Base/Model/IRxApp";
import { IRxPage } from "Base/Model/IRxPage";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { useContext } from "react";
import { ID } from "rx-drag/models/baseTypes";
import { DARK, RxThemeMode } from "rx-drag/store/IRxThemeOptions";
import { NavigationEditorStore } from "./RxNavigationEditor/NavigationEditorStore";
import { PageEditorStore } from "./RxPageEditor/PageEditorStore";

export class AppStudioStore{
  verticalBarWidth:string = '60px';
  isDirty:boolean = false;
  themeMode:RxThemeMode = DARK;

  navigationEditor?:NavigationEditorStore;
  rxApp?: IRxApp;

  pageEditor?:PageEditorStore;

  constructor() {
    makeAutoObservable(this)
  }

  setRxApp(rxApp: IRxApp){
    this.rxApp = rxApp;
    //if(rxApp?.pages?.length && ! this.pageEditor){
    //  this.editPage(rxApp.pages[0]);
    //}
  }

  getFirstPage(){
    return this.rxApp?.pages?.length ? this.rxApp?.pages[0] : undefined;
  }

  getPage(pageId:ID){
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

  editPage(page?:IRxPage){
    if(page){
      this.pageEditor = new PageEditorStore(page);
    }
    else{
      this.pageEditor = undefined;
    }

    this.navigationEditor = undefined;
  }

  editNavigation(){
    this.pageEditor = undefined;
    this.navigationEditor = new NavigationEditorStore();
  }

  setThemeMode(mode:RxThemeMode){
    this.themeMode = mode;
  }
}

export const AppStudioStoreContext = createContext<AppStudioStore|undefined>(undefined);
export const AppStudioStoreProvider = AppStudioStoreContext.Provider;

export const useAppStudioStore = (): AppStudioStore|undefined => useContext(AppStudioStoreContext);
