import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import StringInput from "AppStudio/RxPageEditor/AttrebuteBox/PropsInputs/StringInput";
import { IMeta } from "Base/RXNode/IMeta";
import elevationRules from "Components/common/configs/elevationRules";
import marginConfigs from "Components/common/configs/marginConfigs";

export class OneToManyPortletRule extends MetaConfig{
  empertyPadding = '';
  hasField = true;
  
  accept(child:IMeta){
    if(child.name === 'FormGridContainer'){
      return true;
    }
    return false;
  }

  getPropConfigs(): Array<IPropConfig>{
    return [
      ...marginConfigs,
      ...elevationRules,   
      {
        name:'title',
        label:'title',
        input:StringInput,      
      },
      {
        name:'helperText',
        label:'helper-text',
        input:StringInput,
      },
    ]
  }

}