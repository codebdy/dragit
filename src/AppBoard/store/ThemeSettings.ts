import { makeAutoObservable } from "mobx"
import sidebarImg1 from 'assets/img/sidebar-1.jpg';
import sidebarImg2 from 'assets/img/sidebar-2.jpg';
import sidebarImg3 from 'assets/img/sidebar-3.jpg';
import sidebarImg4 from 'assets/img/sidebar-4.jpg';
import sidebarImg5 from 'assets/img/sidebar-5.jpg';
import sidebarImg6 from 'assets/img/sidebar-6.jpg';
import sidebarImg7 from 'assets/img/sidebar-7.jpg';
import sidebarImg8 from 'assets/img/sidebar-8.jpg';

export const LIGHT = "light";
export const DARK = "dark";
export const linearGradient1 = "linear-gradient(45deg,#fafafa,#fafafa)";
export const linearGradient2 = "linear-gradient(45deg,#780206,#061161)";
export const linearGradient3 = "linear-gradient(45deg,#33001b,#ff0084)";
export const linearGradient4 = "linear-gradient(45deg,#360033,#0b8793)";
export const linearGradient5 = "linear-gradient(45deg,#303030,#303030)";

export type ThemeMode = "light"|"dark";

export class LeftDrawerSkin{
  image:string = sidebarImg5;
  mask:string = linearGradient2;
  mode: ThemeMode = DARK;
  maskOpacity: number = 0.8;

  constructor() {
    makeAutoObservable(this)
  }

  setImage(image:string){
    this.image = image;
  }
  setMask(mask:string){
    this.mask = mask;
  }
  setMode(mode:ThemeMode){
    this.mode = mode;
  }

  setMaskOpacity(maskOpacity:number){
    this.maskOpacity = maskOpacity;
  }
}

export class ToolbarSkin{
  floatStyle:boolean = false;
  colored:boolean = false;
  mode:ThemeMode = DARK;
  constructor() {
    makeAutoObservable(this)
  }

  setFloatStyle(floatStyle:boolean){
    this.floatStyle = floatStyle;
  }
  setColored(colored:boolean){
    this.colored = colored;
  }
  setMode(mode:ThemeMode){
    this.mode = mode;
  }
}

export class ThemeSettings {
  themeMode: ThemeMode = DARK;
  elevationStrength: number =  4;
  primary: string = '#5d78ff';

  leftDrawerSkin: LeftDrawerSkin= new LeftDrawerSkin();

  toolbarSkin:ToolbarSkin = new ToolbarSkin();

  constructor() {
    makeAutoObservable(this)
  }

  setThemeMode(themeMode:ThemeMode){
    this.themeMode = themeMode;
  }

  setPrimary(primary:string){
    this.primary = primary;
  }

  setSlevationStrength(elevationStrength:number){
    this.elevationStrength = elevationStrength
  }
};

export {
  sidebarImg1, 
  sidebarImg2,
  sidebarImg3, 
  sidebarImg4, 
  sidebarImg5,
  sidebarImg6,
  sidebarImg7,
  sidebarImg8,
}