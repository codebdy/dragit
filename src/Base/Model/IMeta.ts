import { IValidateRule } from "./IValidateRule";

export interface IMetaProps{
  rule?:IValidateRule;
  [key:string]: any
}

export interface IMeta{
  name:string,
  props?:IMetaProps,
  selfRenderChildren?:boolean,
  designProps?:{[key:string]: any},
  auths?:string[],
  graphiQL?:string,
}