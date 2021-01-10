import { IValidateRule } from "./IValidateRule";

export interface IMeta{
  name:string,
  props?:{
    rule?:IValidateRule,
    [key:string]: any
  },
  withActions?:boolean,
  selfRenderChildren?:boolean,
  designProps?:{[key:string]: any},
  auths?:string[],
  graphiQL?:string,
}