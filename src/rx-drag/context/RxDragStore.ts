import { makeAutoObservable } from "mobx";
import { IRxLocales } from "rx-drag/IRxLocales";
import { IRxThemeOptions, LIGHT, DARK, RxThemeMode } from "./IRxThemeOptions";

class RxThemeOptions implements IRxThemeOptions{
  mode : RxThemeMode = LIGHT;
  lightBackgroundColor: string = "#fff";
  darkBackgroundColor: string = "#1a233a";
  lightBorderColor: string = "#dfe3e7";
  darkBorderColor: string = "#464d5c";
  lightCanvasColor: string = "#FFF";
  darkCanvasColor: string = "#212121";
  canSwitchThemeMode: boolean = true;

  constructor() {
    makeAutoObservable(this)
  }

  setThemeMode(mode:RxThemeMode){
    this.mode = mode;
  }

  get borderColor(){
    return this.mode === LIGHT ? this.lightBorderColor : this.darkBorderColor;
  }

  get backgroundColor(){
    return this.mode === LIGHT ? this.lightBackgroundColor : this.darkBackgroundColor;
  }

  get themeModeClass(){
    return this.mode === LIGHT ? 'rx-light' : 'rx-dark';
  }

  get canvasColor(){
    return this.mode === LIGHT ? this.lightCanvasColor : this.darkCanvasColor;
  }

  setOptions(options?:IRxThemeOptions){
    this.setThemeMode(options?.mode ? options?.mode : this.mode);
  }
}

export type TabType = 'toolbox'|'attributes'|'settings';

export class RxDragStore{
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