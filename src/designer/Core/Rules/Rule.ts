import { IRule } from "./IRule";
import { IMeta } from "../Node/IMeta";

export class Rule implements IRule{
  label ="Div";
  match(meta:IMeta){
    return true;
  }
}