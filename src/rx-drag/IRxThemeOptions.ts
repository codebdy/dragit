export type RxThemeMode = 'light' | 'dark';

export interface IRxThemeOptions{
  mode?: RxThemeMode;
  toolbar?:{
    background?:string,
    color?:string,
  };
  canvas?:{
    selectedLabelColor?:string,
    nodeToolbarColor?:string
  }
}