import { AxiosRequestConfig } from "axios";

export interface IPageSchema{
  layout?:Array<any>,
  isFormPage?:boolean,
  refreshAppInfo?:boolean,
  getApi?:AxiosRequestConfig, 
  submitApi?:AxiosRequestConfig,
}

export interface IPage{
  id:number,
  slug:string,
  name?:string, 
  jsonSchema?:IPageSchema,  
}