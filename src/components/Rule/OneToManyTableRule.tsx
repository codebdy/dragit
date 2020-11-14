import { Rule } from "./Rule";
import { IMeta } from "../../designer/Core/Node/IMeta";
import { INode } from "../../designer/Core/Node/INode";
import { IField } from "../IRule";
import OneToManyTableColumnsDialog from "designer/Attrebutebox/Inputs/OneToManyTableColumnsDialog";
import TextInput from "designer/Attrebutebox/Inputs/TextInput";
import OptionSelect from "designer/Attrebutebox/Inputs/OptionSelect";

export class OneToManyTableRule extends Rule{
  empertyPadding = '';
  
  match(meta:IMeta){
     return meta.name === 'OneToManyTable';
  }

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
        input:TextInput,
      },
    ]
  }

}