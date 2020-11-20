import { AxiosRequestConfig } from "axios";

export interface PageSchema{
  layout?:Array<any>,
  isFormPage?:boolean,
  api?:AxiosRequestConfig, 
}

export interface IPage{
  id:number,
  title?:string, 
  jsonSchema?:PageSchema,  
}