import { Rule } from "base1/Rules/Rule";
import { IMeta } from "base1/Model/IMeta";
import { IProp } from "base1/Model/IProp";
import OptionSelect from "base1/PropsInputs/OptionSelect";
import SwitchInput from "base1/PropsInputs/BooleanInput";
import StringInput from "base1/PropsInputs/StringInput";

export class TypographyRule extends Rule{

  match(meta:IMeta){
    return meta.name === 'Typography';
  }

  accept(child:IMeta){
    return false;
  }

  getFields(): Array<IProp>{
    return [
      {
        name:'align',
        label:'align',
        input:OptionSelect,

        props:{
          items:[
            {
              value:'inherit',
              label:'inherit',
            },
            {
              value:'left',
              label:'Left'
            },
            {
              value:'center',
              label:'Center'
            },
            {
              value:'right',
              label:'Right'
            },
            {
              value:'justify',
              label:'Justify'
            }
          ],          
        },
      },
      {
        name:'display',
        label:'display',
        input:OptionSelect,
        props:{
          items:[
            {
              value:'initial',
              label:'Initial'
            },
            {
              value:'block',
              label:'Block'
            },
            {
              value:'inline',
              label:'Inline'
            }
          ],
        },
      },
      {
        name:'gutterBottom',
        label:'gutter-bottom',
        input:SwitchInput,
      },
      {
        name:'noWrap',
        label:'no-wrap',
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
          items:[
            {
              value:'h1',
              label:'h1',              
            },
            {
              value:'h2',
              label:'h2',              
            },
            {
              value:'h3',
              label:'h3',              
            },
            {
              value:'h4',
              label:'h4',              
            },
            {
              value:'h5',
              label:'h5',              
            },
            {
              value:'h6',
              label:'h6',              
            },
            {
              value:'subtitle1',
              label:'subtitle1',              
            },
            {
              value:'subtitle2',
              label:'subtitle2',              
            },
            {
              value:'body1',
              label:'body1',              
            },
            {
              value:'body2',
              label:'body2',              
            },
            {
              value:'caption',
              label:'caption',              
            },
            {
              value:'button',
              label:'button',              
            },
            {
              value:'overline',
              label:'overline',              
            },
            {
              value:'srOnly',
              label:'srOnly',              
            },
            {
              value:'inherit',
              label:'inherit',              
            },

          ]
        },
      },

      {
        name:'rxText',
        label:'text',
        xs:12,
        input:StringInput,
      },
    ]
  }

}