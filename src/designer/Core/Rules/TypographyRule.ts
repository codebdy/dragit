import { Rule } from "./Rule";
import { IMeta } from "../Node/IMeta";
import { INode } from "../Node/INode";
import { IField } from "./IRule";
import OptionSelect from "designer/Attrebutebox/Inputs/OptionSelect";
import SwitchInput from "designer/Attrebutebox/Inputs/SwitchInput";

export class TypographyRule extends Rule{

  match(meta:IMeta){
    return meta.name === 'Typography';
  }

  accept(child:INode){
    return false;
  }

  getFields(): Array<IField>{
    return [
      {
        name:'align',
        label:'align',
        input:OptionSelect,
        schema:{
          'inherit' : 'inherit',
          'left': 'left',
          'center' : 'center',
          'right' : 'right',
          'justify' : 'justify',
        },
      },
      {
        name:'display',
        label:'display',
        input:OptionSelect,
        schema:{
          'initial' : 'initial',
          'block': 'block',
          'inline' : 'inline',
        },
      },
      {
        name:'gutterBottom',
        label:'gutterBottom',
        input:SwitchInput,
      },
      {
        name:'noWrap',
        label:'noWrap',
        input:SwitchInput,
      },
      {
        name:'paragraph',
        label:'paragraph',
        input:SwitchInput,
      },
      {
        name:'variant',
        label:'variant',
        input:OptionSelect,
        schema:{
          'h1' : 'h1',
          'h2': 'h2',
          'h3' : 'h3',
          'h4' : 'h4',
          'h5' : 'h5',
          'h6' : 'h6',
          'subtitle1' : 'subtitle1',
          'subtitle2' : 'subtitle2',
          'body1' : 'body1',
          'body2' : 'body2',
          'caption' : 'caption',
          'button' : 'button',
          'overline' : 'overline',
          'srOnly' : 'srOnly',
          'inherit' : 'inherit',
        },
      },
    ]
  }

}