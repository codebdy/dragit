import { Rule } from "./Rule";
import { INode } from "../Node/INode";
import { IMeta } from "../Node/IMeta";
import { IField } from "./IRule";
import OptionSelect from "designer/Attrebutebox/Inputs/OptionSelect";
import { colWidthOptions } from "./GridItemRule";
import SwitchInput from "designer/Attrebutebox/Inputs/SwitchInput";
import TextInput from "designer/Attrebutebox/Inputs/TextInput";

export class FormGridItemRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  empertyPadding = '';
  hasData = true;

  match(meta:IMeta){
    return meta.name === 'FormGridItem';
  }
  
  accept(child:INode){
    return false;
  }

  resolveLabel(meta:IMeta):string|undefined{
    return 'Form item:' + meta.props?.as;
  }

  getFields(meta?:IMeta): Array<IField>{
    let options:Array<IField> = []
    
    if(meta?.props?.as === "TextField"){
      options.push(
        {
          name:'multiline',
          label:'multiline',
          input:SwitchInput,
        },
        {
          name:'rows',
          label:'rows',
          input:TextInput,
        },
        {
          name:'size',
          label:'size',
          input:OptionSelect,
          schema:{
            'Medium' : 'medium',
            'Small': 'small',
          },
        }
   
      )
    }
    return [
      {
        name:'variant',
        label:'variant',
        input:OptionSelect,
        schema:{
          'Filled' : 'filled',
          'Outlined': 'outlined',
          'Standard' : 'standard',
        },
      },
      {
        name:'label',
        label:'label',
        input:TextInput,
      }, 
      {
        name:'required',
        label:'required',
        input:SwitchInput,
      },
      ...options,
      ...colWidthOptions,
      {
        name:'helperText',
        label:'helper-text',
        input:TextInput,
      }
    ]
  }

}