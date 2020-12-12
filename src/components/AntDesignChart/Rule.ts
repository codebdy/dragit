import { Rule } from "base/Rules/Rule";
import { IProp } from "base/Model/IProp";
import StringInput from "base/PropsInputs/StringInput";
import { IMeta } from "base/Model/IMeta";
import apiRule from "base/Rules/apiRule";
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