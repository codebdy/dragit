import { Rule } from "../../base/Rules/Rule";
import { INode } from "../../designer/Core/Node/INode";
import NumberInput from "base/PropsInputs/NumberInput";
import { IField } from "../../base/Rules/IRule";
import StringInput from "base/PropsInputs/StringInput";

export class MediasPortletRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  
  accept(child:INode){
    return false;
  }
  getFields(): Array<IField>{
    return [
      {
        name:'spacingTop',
        label:'spacing-top',
        input:NumberInput,
      },

      {
        name:'spacingRight',
        label:'spacing-right',
        input:NumberInput,
      },
      {
        name:'spacingBottom',
        label:'spacing-bottom',
        input:NumberInput,
      },
      {
        name:'spacingLeft',
        label:'spacing-left',
        input:NumberInput,
      },
      {
        name:'elevation',
        label:'elevation',
        input:NumberInput,
      },
      {
        name:'cols',
        label:'cols',
        input:StringInput,
      },

    ]
  }

}