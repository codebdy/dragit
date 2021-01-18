import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { ActionStore, ActionStoreProvider, useActionStore } from 'Base/PageUtils/ActionStore';
import { PageAction } from 'Base/PageUtils/PageAction';
import { OPEN_PAGE_ACTION, REMOVE_LIST_VIEW_RECORD, UPDATE_LIST_VIEW_RECORD } from "Base/PageUtils/ACTIONs";
import { ModelStore } from 'Base/ModelTree/ModelStore';
import ActionHunter from 'Base/PageUtils/ActionHunter';
import { RXModel } from 'Base/ModelTree/RXModel';

const ListViewTableRowActionFilter = observer((
    props:{
      row:RXModel,
      children?:any,
    }
  )=>{

  const {
    row,
    children
  } = props
  const parentActionStore = useActionStore();
  const [actionStore] = useState(new ActionStore());

  const hanlePageAction = (action:PageAction)=>{
    switch(action?.name){
      case REMOVE_LIST_VIEW_RECORD:
        parentActionStore?.emit({...action, id:row.value?.id})
        break;
      case UPDATE_LIST_VIEW_RECORD:
        console.assert(action.field, 'Update action field not set');
        if(action.field){
          parentActionStore?.emit({...action, id:row.value.id, value:row.value[action.field]})          
        }

        break;
      case OPEN_PAGE_ACTION:
        console.assert(action.page, 'Page not set on OPEN_PAGE_ACTION');
        parentActionStore?.emit({...action, page:{...action.page, dataId:row.value.id}});
        break;
      default:
        //处理不了的Action转发给父组件
        if(action){
          parentActionStore?.emit(action);          
        }
    }
  }

  return (
    <ActionStoreProvider value = {actionStore}>
      <ActionHunter onPageAction = {hanlePageAction}/>
      {children}
   </ActionStoreProvider>
  );
})

export default ListViewTableRowActionFilter;

