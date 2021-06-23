import { IRxAuth } from "Base/Model/IRxAuth";
import { IRxMeta } from "rx-drag/models/IRxMeta";
import { IValidateRule } from "../Model/IValidateRule";

export interface IMeta extends IRxMeta{
  field?:string,
  isSelect?:boolean,
  onlyShow?:boolean,
  rule?:IValidateRule,
  withNode?:boolean,
  designProps?:{[key:string]: any},
  auths?:IRxAuth[],
}