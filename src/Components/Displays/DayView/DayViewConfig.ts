import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";
import marginConfigs from "Components/common/configs/marginConfigs";

export class DayViewConfig extends MetaConfig{
  //empertyPadding = '';
  hasField = true;
  
  accept(child:IMeta){
    return false;
  }

  getPropsConfig(): Array<IPropConfig>{
    return [
      ...marginConfigs,
      {
        name:'format',
        labelKey:'format',
        propType:'string',
        props:{
          xs:12,
        }
      },
      {
        name:'display',
        labelKey:'display',
        propType:'select',
        props:{
          items:[
            {
              value:'inline',
              label:'Inline'
            },
            {
              value:'block',
              label:'Block'
            },
          ]
        }
      }
    ]
  }

}