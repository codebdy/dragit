export type RxThemeMode = 'light' | 'dark';
export const LIGHT = 'light';
export const DARK = 'dark';
export interface IRxThemeClasses{
  toolbar?:string,
}

export interface IRxThemeOptions{
  mode?: RxThemeMode;
  lightBackgroundColor: string;
  darkBackgroundColor: string;
  lightBorderColor: string;
  darkBorderColor: string;
  canvasColor: string;
  
  classes :IRxThemeClasses;

  canvas?:{
    selectedLabelColor?:string,
    nodeToolbarColor?:string
  }
}