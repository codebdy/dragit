import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";

export class GridContainerRule extends Rule{
  editPaddingY = '16px';
  editPaddingX = '16px';
  label ="Grid Container";

  match(meta:IMeta){
    if(meta.name === 'Grid' && meta.props?.container === true){
      return true;
    }
    return false;
  }
}