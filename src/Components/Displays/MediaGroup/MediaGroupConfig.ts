import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";
import marginConfigs from "Components/common/configs/marginConfigs";

export class MediaGroupConfig extends MetaConfig{
  empertyPadding = '8px';
  hasField = true;
  
  accept(child:IMeta){
    return false;
  }

  getPropsConfig(): Array<IPropConfig>{
    return [
      ...marginConfigs,
      {
        name:'count',
        labelKey:'count',
        propType:'number',
      },
      {
        name:'max',
        label:'max',
        propType:'number',
      },
      {
        name:'spacing',
        labelKey:'spacing',
        propType:'select',
        props:{
          items:[
            {
              value:'small',
              label:'Small',
            },
            {
              value:'medium',
              label:'Medium',
            }

          ]
        }
      }
    ]
  }

}