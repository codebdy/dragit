import { Rule } from "base/Rules/Rule";
import { IProp } from "base/Model/IProp";
import StringInput from "base/PropsInputs/StringInput";
import { IMeta } from "base/Model/IMeta";
import elevationRules from "base/Rules/elevationRules";
import marginRules from "base/Rules/marginRules";
import ApiEditor from "base/PropsInputs/ApiEditor";

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