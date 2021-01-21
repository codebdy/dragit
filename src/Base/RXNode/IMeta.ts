import { IValidateRule } from "../Model/IValidateRule";

export interface IMeta{
  name:string,
  props?:{
    //rule?:IValidateRule;
    [key:string]: any
  },
  field?:string,
  onlyShow?:boolean,
  rule?:IValidateRule,
  withNode?:boolean,
  designProps?:{[key:string]: any},
  auths?:string[],
  graphiQL?:string,
}