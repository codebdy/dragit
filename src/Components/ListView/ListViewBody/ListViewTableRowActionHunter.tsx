import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { ActionStore, ActionStoreProvider, useActionStore } from 'Base/Action/ActionStore';
import { OPEN_PAGE_ACTION, REMOVE_LIST_VIEW_RECORD, UPDATE_LIST_VIEW_RECORD } from 'Base/Action/PageAction';
import { useEffect } from 'react';
import { ModelStore } from 'Base/ModelTree/ModelStore';

const ListViewTableRowActionHunter = observer((
    props:{
      row:ModelStore,
      children?:any,
    }
  )=>{

  const {
    row,
    children
  } = props
  const parentActionStore = useActionStore();
  const [actionStore] = useState(new ActionStore());
  useEffect(()=>{
    const action = actionStore?.popAction();
    switch(action?.name){
      case REMOVE_LIST_VIEW_RECORD:
        parentActionStore?.emit({...action, id:row.model?.id})
        break;
      case UPDATE_LIST_VIEW_RECORD:
        console.assert(action.field, 'Update action field not set');
        if(action.field){
          parentActionStore?.emit({...action, id:row.model.id, value:row.model[action.field]})          
        }

        break;
      case OPEN_PAGE_ACTION:
        console.assert(action.page, 'Page not set on OPEN_PAGE_ACTION');
        parentActionStore?.emit({...action, page:{...action.page, dataId:row.model.id}});
        break;
      default:
        //处理不了的Action转发给父组件
        if(action){
          parentActionStore?.emit(action);          
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[actionStore?.waitingActions.length])

  return (
    <ActionStoreProvider value = {actionStore}>
     {children}
   </ActionStoreProvider>
  );
})

export default ListViewTableRowActionHunter;

