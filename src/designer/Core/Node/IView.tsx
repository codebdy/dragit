//import { ISchema } from "../Schemas/ISchema";

import { INode } from "./INode";

export interface IView{
  //setStyle:(style:{[key:string]:string})=>void;
  //setClassName:(className:string)=>void;
  //setSchema:(schema:ISchema)=>void;
  refresh: (node:INode)=>void;
  getDom: ()=>any;
}