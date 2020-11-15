import { Rule } from "../../base/Rules/Rule";
import { INode } from "../../designer/Core/Node/INode";
import { IField } from "../../base/Rules/IRule";
import OneToManyTableColumnsDialog from "designer/Attrebutebox/Inputs/OneToManyTableColumnsDialog";
import StringInput from "base/PropsInputs/StringInput";
import OptionSelect from "designer/Attrebutebox/Inputs/OptionSelect";

export class OneToManyTableRule extends Rule{
  empertyPadding = '';
  
  accept(child:INode){
    return false;
  }

  getFields(): Array<IField>{
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
        schema:{
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