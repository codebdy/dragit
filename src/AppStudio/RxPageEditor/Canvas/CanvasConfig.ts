import { IMeta } from "Base/RXNode/IMeta";
import { MetaConfig } from "../../../Base/RXNode/MetaConfig";

export class CanvasConfig extends MetaConfig{
  editPaddingY = '';
  editPaddingX = '';
  dropInMargin = 0;

  accept(child:IMeta){
    
    if(child.name === 'GridColumn' 
      || (child.name.startsWith('ListView') && child.name !== 'ListView')
    ){
      return false;
    }
    return true;
  }
}