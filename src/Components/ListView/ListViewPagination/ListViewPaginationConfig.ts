import { MetaConfig } from "Base/RXNode/MetaConfig";
import { IPropConfig } from "rx-drag/models/IPropConfig";
import { IMeta } from "Base/RXNode/IMeta";
import marginConfigs from "Components/common/configs/marginConfigs";

export class ListViewPaginationConfig extends MetaConfig{
  empertyPadding = '';
  
  accept(child:IMeta){
    return false;
  }

  getPropConfigs(): Array<IPropConfig>{
    return [
      ...marginConfigs,
      {
        name:'rowsPerPage',
        labelKey:'rows-per-page',
        propType:'select',
        props:{
          items:[
            {
              value:5,
              label:'5'
            },
            {
              value:10,
              label:'10'
            },
            {
              value:25,
              label:'25'
            },
            {
              value:50,
              label:'50'
            },
            {
              value:100,
              label:'100'
            },
          ]
        }
      },
    ]
  }

}