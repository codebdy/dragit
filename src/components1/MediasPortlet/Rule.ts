import { Rule } from "base1/Rules/Rule";
import { IProp } from "base1/Model/IProp";
import OptionSelect from "base1/PropsInputs/OptionSelect";
import marginRules from "base1/Rules/marginRules";
import elevationRules from "base1/Rules/elevationRules";
import { IMeta } from "base1/Model/IMeta";

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