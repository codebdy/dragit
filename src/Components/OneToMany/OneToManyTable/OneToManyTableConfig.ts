import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";
import elevationConfig from "Components/common/configs/elevationConfig";
import marginConfigs from "Components/common/configs/marginConfigs";
import helperTextConfig from "Components/common/configs/helperTextConfig";

export class OneToManyTableConfig extends MetaConfig{
  empertyPadding = '';
  hasField = true;
  
  accept(child:IMeta){
    if(child.name === 'TableColumn'){
      return true;
    }
    return false;
  }

  getPropConfigs(): Array<IPropConfig>{
    return [
      ...marginConfigs,
      ...elevationConfig,   
      {
        name:'size',
        labelKey:'size',
        propType:'select',
        props:{
          items:[
            {
              value:'medium',
              label:'Medium'
            },
            {
              value:'small',
              label:'Small'
            },
          ]
        },
      },
      helperTextConfig,
    ]
  }

}