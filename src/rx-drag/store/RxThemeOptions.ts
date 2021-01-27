import { makeAutoObservable } from "mobx";
import { IRxThemeOptions, LIGHT, RxThemeMode } from "./IRxThemeOptions";

export class RxThemeOptions implements IRxThemeOptions {
  mode: RxThemeMode = LIGHT;
  lightBackgroundColor: string = "#fff";
  darkBackgroundColor: string = "#1a233a";
  lightBorderColor: string = "#dfe3e7";
  darkBorderColor: string = "#464d5c";
  lightCanvasColor: string = "#FFF";
  darkCanvasColor: string = "#212121";
  canSwitchThemeMode: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  setThemeMode(mode: RxThemeMode) {
    this.mode = mode;
  }

  get borderColor() {
    return this.mode === LIGHT ? this.lightBorderColor : this.darkBorderColor;
  }

  get backgroundColor() {
    return this.mode === LIGHT ? this.lightBackgroundColor : this.darkBackgroundColor;
  }

  get themeModeClass() {
    return this.mode === LIGHT ? 'rx-light' : 'rx-dark';
  }

  get canvasColor() {
    return this.mode === LIGHT ? this.lightCanvasColor : this.darkCanvasColor;
  }

  setOptions(options?: IRxThemeOptions) {
    this.setThemeMode(options?.mode ? options?.mode : this.mode);
  }
}
