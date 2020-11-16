import { Rule } from "../../base/Rules/Rule";
import { IMeta } from "../../base/IMeta";
import { INode } from "../../designer/PageEditor/Core/Node/INode";
import { IProp } from "../../base/IProp";
import OptionSelect from "base/PropsInputs/OptionSelect";
import SwitchInput from "base/PropsInputs/BooleanInput";
import TextBox from "components/TextBox";

export class TypographyRule extends Rule{

  match(meta:IMeta){
    return meta.name === 'Typography';
  }

  accept(child:INode){
    return false;
  }

  getFields(): Array<IProp>{
    return [
      {
        name:'align',
        label:'align',
        input:OptionSelect,
        props:{
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
        props:{
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
        props:{
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

      {
        name:'rxText',
        label:'text',
        input:TextBox,
      },
    ]
  }

}