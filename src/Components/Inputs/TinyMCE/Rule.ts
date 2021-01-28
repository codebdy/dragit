import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";
import NumberInput from "AppStudio/Pages/RxPageEditor/AttrebuteBox/PropsInputs/NumberInput";

export class TinyMCERule extends MetaConfig{
  empertyPadding = '';
  hasField = true;
  
  accept(child:IMeta){
    return false;
  }

  getPropConfigs(): Array<IPropConfig>{
    return [
      {
        name:'height',
        label:'height',
        input: NumberInput,
      }
    ]
  }

}