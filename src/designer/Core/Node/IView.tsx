import { ISchema } from "../Schemas/ISchema";

export interface IView{
  setStyle:(style:{[key:string]:string})=>void;
  setSchema:(schema:ISchema)=>void;
  dom:()=>any;
}