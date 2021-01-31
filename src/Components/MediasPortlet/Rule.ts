import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import OptionSelect from "AppStudio/RxPageEditor/AttrebuteBox/PropsInputs/OptionSelect";
import marginConfigs from "Components/common/configs/marginConfigs";
import elevationRules from "Components/common/configs/elevationRules";
import { IMeta } from "Base/RXNode/IMeta";

export class MediasPortletRule extends MetaConfig{
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
      ...elevationRules,
      {
        name:'cols',
        label:'cols',
        input:OptionSelect,
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