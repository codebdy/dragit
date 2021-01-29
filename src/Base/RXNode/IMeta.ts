import { IAuth } from "Base/Model/IAuth";
import { IRxMeta } from "rx-drag/models/IRxMeta";
import { IValidateRule } from "../Model/IValidateRule";

export interface IMeta extends IRxMeta{
  field?:string,
  onlyShow?:boolean,
  rule?:IValidateRule,
  withNode?:boolean,
  designProps?:{[key:string]: any},
  auths?:IAuth[],
  graphiQL?:string,
}