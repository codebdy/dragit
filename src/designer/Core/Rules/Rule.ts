import { IRule } from "./IRule";
import { IMeta } from "../Node/IMeta";

export class Rule implements IRule{
  label ="Div";
  dropInMargin = 8;
  match(meta:IMeta){
    return true;
  }

  accept(childRule:IRule){
    return true;
  }
}