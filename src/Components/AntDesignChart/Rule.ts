import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import StringInput from "AppStudio/Pages/RxPageEditor/AttrebuteBox/PropsInputs/StringInput";
import { IMeta } from "Base/RXNode/IMeta";
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

    ]
  }

}