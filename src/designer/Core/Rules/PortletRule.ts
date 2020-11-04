import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";
import { INode } from "../Node/INode";
import NumberInput from "designer/Attrebutebox/Inputs/NumberInput";
import { IField } from "./IRule";
import SwitchInput from "designer/Attrebutebox/Inputs/SwitchInput";

export class PortletRule extends Rule{

  match(meta:IMeta){
    return meta.name === 'Portlet';
  }

  accept(child:INode){
    if(child.meta.name === "PortletFormGridBody"){
      return true
    }
    if(child.meta.name === "PortletFooter"){
      return true
    }
    return false;
  }

  getFields(): Array<IField>{
    return [
      {
        name:'open',
        label:'open',
        input:SwitchInput,
      },      
      {
        name:'spacingTop',
        label:'spacing-top',
        input:NumberInput,
        schema:{
          max:100,
          min:0,
          step:1
        }
      },

      {
        name:'spacingRight',
        label:'spacing-right',
        input:NumberInput,
        schema:{
          max:100,
          min:0,
          step:1
        }
      },
      {
        name:'spacingBottom',
        label:'spacing-bottom',
        input:NumberInput,
        schema:{
          max:100,
          min:0,
          step:1
        }
      },
      {
        name:'spacingLeft',
        label:'spacing-left',
        input:NumberInput,
        schema:{
          max:100,
          min:0,
          step:1
        }
      },
      {
        name:'elevation',
        label:'elevation',
        input:NumberInput,
        schema:{
          max:24,
          min:0,
          step:1
        }
      },

    ]
  }

}