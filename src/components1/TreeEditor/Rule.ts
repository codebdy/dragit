import { Rule } from "base1/Rules/Rule";
import { IProp } from "base1/Model/IProp";
import StringInput from "base1/PropsInputs/StringInput";
import { IMeta } from "base1/Model/IMeta";
import elevationRules from "base1/Rules/elevationRules";
import marginRules from "base1/Rules/marginRules";
import ApiEditor from "base1/PropsInputs/ApiEditor";

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