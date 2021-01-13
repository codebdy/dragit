import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { useActionStore } from 'Base/Action/ActionStore';
import { BATCH_REMOVE_LIST_VIEW_RECORDS, BATCH_UPDATE_LIST_VIEW_RECORDS, PageAction } from 'Base/Action/PageAction';
import { useEffect } from 'react';
import { action } from 'mobx';

const ListViewActionHunter = observer((
    props:{
      onExcuteBatchUpdate:()=>void,
      onExcuteBatchRemove:()=>void,
      //处理不了的Action转发给父组件
      onPageAction:(action:PageAction)=>void,
    }
  )=>{

  const {
    onExcuteBatchUpdate,
    onExcuteBatchRemove,
    onPageAction,
  } = props
  const actionStore = useActionStore();
 
  if(actionStore?.hasAction()){
    const action = actionStore.popAction();
    switch(action?.name){
      case BATCH_REMOVE_LIST_VIEW_RECORDS:
        break;
      case BATCH_UPDATE_LIST_VIEW_RECORDS:
        break;
      
      default:
        action && onPageAction(action);
    }
  }

  return (
   <Fragment></Fragment>
  );
})

export default ListViewActionHunter;

