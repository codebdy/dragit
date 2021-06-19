import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IMeta } from "Base/RXNode/IMeta";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import marginConfigs from "Components/common/configs/marginConfigs";

export class TypographyConfig extends MetaConfig{

  match(meta:IMeta){
    return meta.name === 'Typography';
  }

  accept(child:IMeta){
    return false;
  }

  getPropsConfig(): Array<IPropConfig>{
    return [
      ...marginConfigs,
      {
        name:'align',
        labelKey:'align',
        propType:'select',

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
        labelKey:'display',
        propType:'select',
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
        labelKey:'gutter-bottom',
        propType:'boolean',
      },
      {
        name:'noWrap',
        labelKey:'no-wrap',
        propType:'boolean',
      },
      {
        name:'paragraph',
        labelKey:'paragraph',
        propType:'boolean',
      },
      {
        name:'variant',
        labelKey:'variant',
        propType:'select',
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
        labelKey:'text',
        propType:'string',
        props:{
          xs:12,
          rows:3,
          multiline:true,
        }
      },
    ]
  }

}