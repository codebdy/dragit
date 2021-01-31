import { IMeta } from "Base/RXNode/IMeta";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import BooleanInput from "AppStudio/RxPageEditor/AttrebuteBox/PropsInputs/BooleanInput";
import StringInput from "AppStudio/RxPageEditor/AttrebuteBox/PropsInputs/StringInput";
import colorRule from "Components/common/configs/colorRule";
import itemsRule from "Components/common/configs/itemsRule";
import { MetaConfig } from "Base/RXNode/MetaConfig";
import sizeRule from "Components/common/configs/sizeRule";

export class CheckboxGroupRule extends MetaConfig{
  //editPaddingY = '';
  //editPaddingX = '';
  //empertyPadding = '';
  hasField = true;
  hasValidation = true;

  accept(child:IMeta){
    return false;
  }

  getPropConfigs(): Array<IPropConfig>{
    return [
      {
        name:'label',
        label:'label',
        input:StringInput,
      },
      colorRule,
      sizeRule,
      {
        name:'row',
        label:'row-show',
        input:BooleanInput,
      },
      {
        name:'helperText',
        label:'helper-text',
        input:StringInput,
      },
      itemsRule
    ]
  }

}