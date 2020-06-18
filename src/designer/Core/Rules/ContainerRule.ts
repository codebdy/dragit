import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";

export class ContainerRule extends Rule{
  labelKey ="page-container";

  match(meta:IMeta){
    if(meta.name === 'Container'){
      return true;
    }
    return false;
  }
}