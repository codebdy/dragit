import { makeAutoObservable } from "mobx";
import { IRxThemeOptions, LIGHT, DARK, RxThemeMode } from "./IRxThemeOptions";

class RxThemeOptions implements IRxThemeOptions{
  mode : RxThemeMode = LIGHT;
  lightBackgroundColor: string = "#fff";
  darkBackgroundColor: string = "#1a233a";
  lightBorderColor: string = "#dfe3e7";
  darkBorderColor: string = "#464d5c";
  canvasColor: string = "#FFF";

  constructor() {
    makeAutoObservable(this)
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
}

export class RxDragStore{
  rightFolded : boolean = false;
  themeOptions : RxThemeOptions = new RxThemeOptions(); 

  constructor() {
    makeAutoObservable(this)
  }

  setRightFolded(rightFolded:boolean){
    this.rightFolded = rightFolded;
  }

}