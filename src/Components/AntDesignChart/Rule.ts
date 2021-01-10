import { Rule } from "Base/Rules/Rule";
import { IProp } from "Base/Model/IProp";
import StringInput from "Base/PropsInputs/StringInput";
import { IMeta } from "Base/Model/IMeta";
import apiRule from "Base/Rules/apiRule";
import JSONEditDialog from "./PropsInputs/JSONEditDialog";

export class AntDesignChartRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  
  accept(child:IMeta){
    return false;
  }

  getFields(): Array<IProp>{
    return [
      {
        name:'chart',
        label:'chart-type',
        input:StringInput,
      },      
      {
        name:'jsonProps',
        label:'json-props',
        input:JSONEditDialog,
      },

      apiRule,
    ]
  }

}