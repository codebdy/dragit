export type MaxWidth = 'lg' | 'md' | 'sm' | 'xl' | 'xs' | 'false';

export interface IPageSchema{
  layout?:Array<any>,
  auths?:string[],
  isFormPage?:boolean,
  refreshAppInfo?:boolean,
  query?:string, 
}

export interface IPage{
  id:number,
  slug:string,
  name?:string, 
  maxWidth?: MaxWidth;
  inTabIndex?:boolean;
  width?:number;
  schema?:IPageSchema,  
}