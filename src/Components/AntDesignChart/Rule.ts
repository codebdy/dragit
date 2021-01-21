import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "Base/RXNode/IPropConfig";
import StringInput from "Design/PageEditor/AttrebuteBox/PropsInputs/StringInput";
import { IMeta } from "Base/RXNode/IMeta";
import apiRule from "Base/RXNode/Configs/apiRule";
import JSONEditDialog from "./PropsInputs/JSONEditDialog";

export class AntDesignChartRule extends MetaConfig{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  
  accept(child:IMeta){
    return false;
  }

  getPropConfigs(): Array<IPropConfig>{
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