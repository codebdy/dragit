import { IValidateRule } from "./IValidateRule";

export interface IMeta{
  name:string,
  props?:{
    rule?:IValidateRule,
    [key:string]: any
  },
  designProps?:{[key:string]: any},
  auths?:string[],
}