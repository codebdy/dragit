import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IMeta } from "Base/RXNode/IMeta";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import marginConfigs from "Components/common/configs/marginConfigs";

export class HeadConfig extends MetaConfig{
  editPaddingY = '';
  editPaddingX = '';
  
  accept(child:IMeta){
    return false;
  }

  resolveLabel(meta:IMeta):string|undefined{
    return meta.name
  }

  getPropConfigs(): Array<IPropConfig>{
    return [
      ...marginConfigs,
       {
        name:'rxText',
        label:'text',
        propType:'string',
        props:{
          //multiline:true,
          //rows:2,
        }
      },
    ]
  }

}