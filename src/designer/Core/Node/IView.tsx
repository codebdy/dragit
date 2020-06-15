//import { ISchema } from "../Schemas/ISchema";


export interface IView{
  //setStyle:(style:{[key:string]:string})=>void;
  //setClassName:(className:string)=>void;
  //setSchema:(schema:ISchema)=>void;
  refresh: ()=>void;
  getDom: ()=>any;
}