import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import marginConfigs from "Components/common/configs/marginConfigs";
import elevationConfig from "Components/common/configs/elevationConfig";
import { IMeta } from "Base/RXNode/IMeta";
import squareConfig from "Components/common/configs/squareConfig";

export class MediasPortletConfig extends MetaConfig{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  hasField = true;
  
  accept(child:IMeta){
    return false;
  }
  getPropConfigs(): Array<IPropConfig>{
    return [
      ...marginConfigs,
      ...elevationConfig,
      squareConfig,
      {
        name:'cols',
        labelKey:'cols',
        propType:'select',
        props:{
          items:[
            {
              value:1,
              label:'1',
            },
            {
              value:2,
              label:'2',
            },
            {
              value:3,
              label:'3',
            },
            {
              value:4,
              label:'4',
            },
            {
              value:6,
              label:'6',
            },
          ],
        }
      },
    ]
  }

}