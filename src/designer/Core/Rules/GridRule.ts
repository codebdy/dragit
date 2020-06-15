import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";

export class GridRule extends Rule{
  editPaddingY = '16px';
  editPaddingX = '16px';
  label ="Grid";

  match(meta:IMeta){
    if(meta.name === 'Grid'){
      return true;
    }
    return false;
  }
}