import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { ActionStore, ActionStoreProvider, useActionStore } from 'Base/PageUtlis/ActionStore';
import { PageAction } from 'Base/PageUtlis/PageAction';
import { BATCH_REMOVE_LIST_VIEW_RECORDS, BATCH_UPDATE_LIST_VIEW_RECORDS, REMOVE_LIST_VIEW_RECORD, UPDATE_LIST_VIEW_RECORD } from "Base/PageUtlis/ACTIONs";
import { ID } from 'Base/Model/graphqlTypes';
import ActionHunter from 'Base/PageUtlis/ActionHunter';

const ListViewActionFilter = observer((
    props:{
      onExcuteBatchUpdate:(field:string, value:any)=>void,
      onExcuteBatchRemove:()=>void,
      onExcuteUpdate:(id:ID, field:string, value:any)=>void,
      onExcuteRemove:(id:ID)=>void,
      children?:any,
    }
  )=>{

  const {
    onExcuteBatchUpdate: onBatchUpdate,
    onExcuteBatchRemove: onBatchRemove,
    onExcuteUpdate: onUpdate,
    onExcuteRemove: onRemove,
    children
  } = props
  const parentActionStore = useActionStore();
  const [actionStore] = useState(new ActionStore());

  const hanlePageAction = (action:PageAction)=>{
    switch(action?.name){
      case BATCH_REMOVE_LIST_VIEW_RECORDS:
        onBatchRemove();
        break;
      case BATCH_UPDATE_LIST_VIEW_RECORDS:
        console.assert(action.field, 'batch update did not set field');
        if(action.field){
          onBatchUpdate(action.field, action.value);          
        }

        break;

      case UPDATE_LIST_VIEW_RECORD:
        console.assert(action.field, 'update action did not set field');
        console.assert(action.id, 'update action did not set id');
        if(action.id && action.field){
          onUpdate(action.id, action.field, action.value);
        }
        break;
      
      case REMOVE_LIST_VIEW_RECORD:
        console.assert(action.id, 'did not select row to update!')
        if(action.id){
          onRemove(action.id);          
        }

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

export default ListViewActionFilter;

