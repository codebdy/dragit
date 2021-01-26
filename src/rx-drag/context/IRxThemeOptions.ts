export type RxThemeMode = 'light' | 'dark';
export const LIGHT = 'light';
export const DARK = 'dark';
export interface IRxThemeClasses{
  toolbar?:string,
}

export interface IRxThemeOptions{
  mode?: RxThemeMode;
  classes :IRxThemeClasses;

  canvas?:{
    selectedLabelColor?:string,
    nodeToolbarColor?:string
  }
}