import { makeAutoObservable } from "mobx";
import { IRxLocales } from "rx-drag/models/IRxLocales";
import { IRxThemeOptions, LIGHT, DARK } from "./IRxThemeOptions";
import { RxThemeOptions } from "./RxThemeOptions";

export type TabType = 'toolbox'|'attributes'|'settings';

export class RxDragShellStore{
  rightFolded : boolean = false;
  themeOptions : RxThemeOptions = new RxThemeOptions(); 
  activedTab : TabType = 'toolbox';
  locales?:IRxLocales;

  constructor(locales?:IRxLocales) {
    this.locales = locales;
    makeAutoObservable(this)
  }

  setRightFolded(rightFolded:boolean){
    this.rightFolded = rightFolded;
  }

  setActiveTab(activeTab:TabType){
    this.activedTab = activeTab;
  }

  toggleThemeMode(){
    this.themeOptions.setThemeMode(this.themeOptions.mode === DARK ? LIGHT : DARK);
  }

  setThemeOptions(options?:IRxThemeOptions){
    this.themeOptions.setOptions(options);
  }

}