import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";

export class MediaSelectConfig extends MetaConfig{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  hasField = true;
  
  accept(child:IMeta){
    return false;
  }
  getPropConfigs(): Array<IPropConfig>{
    return [
      {
        name:'label',
        labelKey:'label',
        propType:'string',
      },
      {
        name:'width',
        labelKey:'width',
        propType:'string',
      },
      {
        name:'avatar',
        labelKey:'avatar',
        propType:'boolean',
      },
    ]
  }

}