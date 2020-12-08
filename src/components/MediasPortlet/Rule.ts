import { Rule } from "base/Rules/Rule";
import { IProp } from "base/Model/IProp";
import OptionSelect from "base/PropsInputs/OptionSelect";
import marginRules from "base/Rules/marginRules";
import elevationRules from "base/Rules/elevationRules";
import { IMeta } from "base/Model/IMeta";

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