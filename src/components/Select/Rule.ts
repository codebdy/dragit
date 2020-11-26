import { IProp } from "base/Model/IProp";
import BooleanInput from "base/PropsInputs/BooleanInput";
import OptionSelect from "base/PropsInputs/OptionSelect";
import StringInput from "base/PropsInputs/StringInput";
import inputRules from "base/Rules/inputRules";
import { Rule } from "base/Rules/Rule";
import { INode } from "designer/PageEditor/Core/Node/INode";
import SelectItemsInputItemDialog from "./PropsInputs/SelectItemsInputItemDialog";

export class SelectRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  hasField = true;
  hasValidation = true;

  accept(child:INode){
    return false;
  }

  getFields(): Array<IProp>{
    return [
      ...inputRules,
      {
        name:'size',
        label:'size',
        input:OptionSelect,
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
      {
        name:'multiple',
        label:'multiple-select',
        xs:6,
        input:BooleanInput,
      },
      {
        name:'fromUrl',
        label:'from-url',
        xs:6,
        input:BooleanInput,
      },
      {
        name:'url',
        label:'url',
        xs:12,
        input:StringInput,
      },
      {
        name:'items',
        label:'items-data',
        xs:12,
        input:SelectItemsInputItemDialog,
      },      
      {
        name:'itemKey',
        label:'item-key',
        input:StringInput,
      },
      {
        name:'itemName',
        label:'item-name',
        input:StringInput,
      },

      {
        name:'helperText',
        label:'helper-text',
        xs:12,
        input:StringInput,
      }
    ]
  }


}