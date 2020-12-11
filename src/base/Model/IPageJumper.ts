export interface IPageJumper{
  moduleSlug?:string,
  pageSlug?:string,
  dataId?:number,
  [key:string]:string|undefined|number,
}