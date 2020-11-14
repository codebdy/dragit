import { Rule } from "../../Rules/Rule";
import { INode } from "../../../designer/Core/Node/INode";
import { IMeta } from "../../../designer/Core/Node/IMeta";
import { IField } from "../../Rules/IRule";
import OptionSelect from "designer/Attrebutebox/Inputs/OptionSelect";
import { colWidthOptions } from "../../Grid/Column/Rule";
import SwitchInput from "designer/Attrebutebox/Inputs/SwitchInput";
import TextInput from "designer/Attrebutebox/Inputs/TextInput";
import SelectItemsInput from "designer/Attrebutebox/Inputs/SelectItemsInput";

export class PortletGridItemRule extends Rule{
  editPaddingY = '';
  editPaddingX = '';
  //empertyPadding = '';
  hasData = true;

  accept(child:INode){
    return false;
  }

  resolveLabel(meta:IMeta):string|undefined{
    return 'Grid Item';
  }

  /*getFields(meta?:IMeta): Array<IField>{
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
    if(meta?.props?.as === "SelectBox"){
      options.push({
          name:'withoutEmpertyItem',
          label:'without-emperty-item',
          input:SwitchInput,
        });      
    }

    if(meta?.props?.as === "SelectBox" || meta?.props?.as === "Combobox"){
      options.push(
        {
          name:'multiple',
          label:'multiple-select',
          input:SwitchInput,
        },
        {
          name:'itemKey',
          label:'item-key',
          input:TextInput,
        },
        {
          name:'itemName',
          label:'item-name',
          input:TextInput,
        },
        {
          name:'data',
          label:'items-data',
          input:SelectItemsInput,
        },
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
  }*/

}