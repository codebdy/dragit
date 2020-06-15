import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";

export class GridItemRule extends Rule{
  editPaddingY = '16px';
  editPaddingX = '16px';
  label ="Grid Item";

  match(meta:IMeta){
    if(meta.name === 'Grid' && meta.props?.item === true){
      return true;
    }
    return false;
  }
}