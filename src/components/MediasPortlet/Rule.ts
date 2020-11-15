import { Rule } from "../../base/Rules/Rule";
import { INode } from "../../designer/Core/Node/INode";
import NumberInput from "base/PropsInputs/NumberInput";
import { IProp } from "../../base/IProp";
import OptionSelect from "base/PropsInputs/OptionSelect";

export class MediasPortletRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  
  accept(child:INode){
    return false;
  }
  getFields(): Array<IProp>{
    return [
      {
        name:'spacingTop',
        label:'spacing-top',
        input:NumberInput,
        props:{
          defaultValue:0,          
        }

      },

      {
        name:'spacingRight',
        label:'spacing-right',
        input:NumberInput,
        props:{
          defaultValue:0,          
        }
      },
      {
        name:'spacingBottom',
        label:'spacing-bottom',
        input:NumberInput,
        props:{
          defaultValue:0,          
        }
      },
      {
        name:'spacingLeft',
        label:'spacing-left',
        input:NumberInput,
        props:{
          defaultValue:0,          
        }
      },
      {
        name:'elevation',
        label:'elevation',
        input:NumberInput,
        props:{
          defaultValue:0,
          min:0,
          max:24,
        }
      },
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