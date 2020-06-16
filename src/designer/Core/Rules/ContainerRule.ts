import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";

export class ContainerRule extends Rule{
  editPaddingY = '16px';
  editPaddingX = '16px';
  labelKey ="page-container";

  match(meta:IMeta){
    if(meta.name === 'Container'){
      return true;
    }
    return false;
  }
}