import { IMeta } from "Base/RXNode/IMeta";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import BooleanInput from "Design/PageEditor/AttrebuteBox/PropsInputs/BooleanInput";
import OptionSelect from "Design/PageEditor/AttrebuteBox/PropsInputs/OptionSelect";
import StringInput from "Design/PageEditor/AttrebuteBox/PropsInputs/StringInput";
import inputRules from "Base/RXNode/Configs/inputRules";
import itemsRule from "Base/RXNode/Configs/itemsRule";
import { MetaConfig } from "Base/RXNode/MetaConfig";

export class TreeSelectRule extends MetaConfig{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  hasField = true;
  hasValidation = true;

  accept(child:IMeta){
    return false;
  }

  getPropConfigs(): Array<IPropConfig>{
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
        input:BooleanInput,
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
        input:StringInput,
      },
      itemsRule,
    ]
  }


}