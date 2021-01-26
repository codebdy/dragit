import { makeAutoObservable } from "mobx";
import { IRxThemeOptions, LIGHT, RxThemeMode } from "./IRxThemeOptions";

class RxThemeOptions implements IRxThemeOptions{
  mode : RxThemeMode = LIGHT;
  classes = {
    toolbar : 'rx-toolbar-color',
  };

  constructor() {
    makeAutoObservable(this)
  }
}

export class RxDragStore{
  rightFolded : boolean = false;
  themeOptions : IRxThemeOptions = new RxThemeOptions(); 

  constructor() {
    makeAutoObservable(this)
  }

  foldRight(){
    this.rightFolded = true;
  }

  expandRight(){
    this.rightFolded = false;
  }
}