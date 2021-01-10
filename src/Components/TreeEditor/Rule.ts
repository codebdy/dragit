import { Rule } from "Base/Rules/Rule";
import { IProp } from "Base/Model/IProp";
import StringInput from "Base/PropsInputs/StringInput";
import { IMeta } from "Base/Model/IMeta";
import elevationRules from "Base/Rules/elevationRules";
import marginRules from "Base/Rules/marginRules";
import ApiEditor from "Base/PropsInputs/ApiEditor";

export class TreeEditorRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  
  accept(child:IMeta){
    if(child.name === 'FormGridContainer'){
      return true;
    }
    return false;
  }

  getFields(): Array<IProp>{
    return [
      ...marginRules,
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