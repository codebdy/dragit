import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IMeta } from "Base/RXNode/IMeta";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import StringInput from "AppStudio/RxPageEditor/AttrebuteBox/PropsInputs/StringInput";

export class HeadRule extends MetaConfig{
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
       {
        name:'rxText',
        label:'text',
        input:StringInput,
        props:{
          //multiline:true,
          //rows:2,
        }
      },
    ]
  }

}