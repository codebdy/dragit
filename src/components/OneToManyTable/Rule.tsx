import { Rule } from "../../base/Rules/Rule";
import { INode } from "../../designer/Core/Node/INode";
import { IProp } from "../../base/IProp";
import OneToManyTableColumnsDialog from "components/OneToManyTable/PropsInputs/OneToManyTableColumnsDialog";
import StringInput from "base/PropsInputs/StringInput";
import OptionSelect from "base/PropsInputs/OptionSelect";

export class OneToManyTableRule extends Rule{
  empertyPadding = '';
  hasField = true;
  
  accept(child:INode){
    return false;
  }

  getFields(): Array<IProp>{
    return [
      {
        name:'columns',
        label:'columns',
        input:OneToManyTableColumnsDialog,
      },
      {
        name:'size',
        label:'size',
        input:OptionSelect,
        props:{
          'Medium' : 'medium',
          'Small': 'small',
        },
      },
      {
        name:'helperText',
        label:'helper-text',
        xs:12,
        input:StringInput,
      },
    ]
  }

}