import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";
import StringInput from "AppStudio/RxPageEditor/AttrebuteBox/PropsInputs/StringInput";
import BooleanInput from "AppStudio/RxPageEditor/AttrebuteBox/PropsInputs/BooleanInput";

export class MediaSelectRule extends MetaConfig{
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
        label:'label',
        input:StringInput,
      },
      {
        name:'width',
        label:'width',
        input:StringInput,
      },
      {
        name:'avatar',
        label:'avatar',
        input:BooleanInput,
      },
    ]
  }

}