import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "Base/RXNode/IPropConfig";
import OptionSelect from "Design/PageEditor/AttrebuteBox/PropsInputs/OptionSelect";
import marginConfigs from "Base/RXNode/Configs/marginConfigs";
import elevationRules from "Base/RXNode/Configs/elevationRules";
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