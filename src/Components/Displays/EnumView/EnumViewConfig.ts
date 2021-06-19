import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";
import marginConfigs from "Components/common/configs/marginConfigs";

export class EnumViewConfig extends MetaConfig{
  //empertyPadding = '';
  hasField = true;
  
  accept(child:IMeta){
    return false;
  }

  getPropsConfig(): Array<IPropConfig>{
    return [
      ...marginConfigs,
      {
        name:'metas',
        propType:'items',
        props:{
          idKey:'value',
          nameKey:'name',
          additionKey:'color',
          additionLabelKey:'color',
          additionItems:[
            {
              value:'default',
              label:'Default',
            },
            {
              value:'primary',
              label:'Primary',
            },
            {
              value:'secondary',
              label:'Secondary',
            }
          ]
        }
      }
    ]
  }

}