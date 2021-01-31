import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";

export class AntDesignChartConfig extends MetaConfig{
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
        labelKey:'chart-type',
        propType:'string',
      },      
      {
        name:'jsonProps',
        labelKey:'json-props',
        propType:'JSON',
      },

    ]
  }

}