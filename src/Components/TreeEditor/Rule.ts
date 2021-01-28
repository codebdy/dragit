import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import StringInput from "AppStudio/Pages/RxPageEditor/AttrebuteBox/PropsInputs/StringInput";
import { IMeta } from "Base/RXNode/IMeta";
import elevationRules from "Base/RXNode/Configs/elevationRules";
import marginConfigs from "Base/RXNode/Configs/marginConfigs";
import ApiEditor from "AppStudio/Pages/RxPageEditor/AttrebuteBox/PropsInputs/ApiEditor";

export class TreeEditorRule extends MetaConfig{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  
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
        name:'apiForGet',
        label:'get-api',
        input:ApiEditor,
      },
      {
        name:'apiForSave',
        label:'submit-api',
        input:ApiEditor,
      }
    ]
  }

}