import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "Base/RXNode/IPropConfig";
import StringInput from "Design/PageEditor/AttrebuteBox/PropsInputs/StringInput";
import { IMeta } from "Base/RXNode/IMeta";
import elevationRules from "Base/RXNode/Configs/elevationRules";
import marginConfigs from "Base/RXNode/Configs/marginConfigs";
import ApiEditor from "Design/PageEditor/AttrebuteBox/PropsInputs/ApiEditor";

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
        xs:12,
        input:StringInput,      
      },
      {
        name:'apiForGet',
        label:'get-api',
        xs:12,
        input:ApiEditor,
      },
      {
        name:'apiForSave',
        label:'submit-api',
        xs:12,
        input:ApiEditor,
      }
    ]
  }

}