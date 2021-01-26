export type RxThemeMode = 'light' | 'dark';
export const LIGHT = 'light';
export const DARK = 'dark';

export interface IRxThemeOptions{
  mode?: RxThemeMode;
  lightBackgroundColor?: string;
  darkBackgroundColor?: string;
  lightBorderColor?: string;
  darkBorderColor?: string;
  lightCanvasColor?: string;
  canSwitchThemeMode?: boolean;

  canvas?:{
    selectedLabelColor?:string,
    nodeToolbarColor?:string
  }
}