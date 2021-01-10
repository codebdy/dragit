import { Rule } from "Base/Rules/Rule";
import { IProp } from "Base/Model/IProp";
import OptionSelect from "Base/PropsInputs/OptionSelect";
import marginRules from "Base/Rules/marginRules";
import elevationRules from "Base/Rules/elevationRules";
import { IMeta } from "Base/Model/IMeta";

export class MediasPortletRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  hasField = true;
  
  accept(child:IMeta){
    return false;
  }
  getFields(): Array<IProp>{
    return [
      ...marginRules,
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