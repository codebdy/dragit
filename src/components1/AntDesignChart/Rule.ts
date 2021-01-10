import { Rule } from "base1/Rules/Rule";
import { IProp } from "base1/Model/IProp";
import StringInput from "base1/PropsInputs/StringInput";
import { IMeta } from "base1/Model/IMeta";
import apiRule from "base1/Rules/apiRule";
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