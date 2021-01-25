import { IRxMeta } from "rx-drag/IRxMeta";
import { IValidateRule } from "../Model/IValidateRule";

export interface IMeta extends IRxMeta{
  field?:string,
  onlyShow?:boolean,
  rule?:IValidateRule,
  withNode?:boolean,
  designProps?:{[key:string]: any},
  auths?:string[],
  graphiQL?:string,
}