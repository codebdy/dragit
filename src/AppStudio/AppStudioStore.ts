import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { useContext } from "react";
import { DARK, ThemeMode } from "Store/ThemeSettings";

export class AppStudioStore{
  verticalBarWidth:string = '60px';
  themeMode:ThemeMode = DARK;

  constructor() {
    makeAutoObservable(this)
  }
}

export const AppStudioStoreContext = createContext<AppStudioStore|undefined>(undefined);
export const AppStudioStoreProvider = AppStudioStoreContext.Provider;

export const useAppStudioStore = (): AppStudioStore|undefined => useContext(AppStudioStoreContext);
