import { observer } from 'mobx-react';
import React, { Fragment, useState } from 'react';
import { useActionStore } from 'Base/Action/ActionStore';
import { BATCH_REMOVE_LIST_VIEW_RECORDS, BATCH_UPDATE_LIST_VIEW_RECORDS, PageAction } from 'Base/Action/PageAction';
import { useEffect } from 'react';
import { useAppStore } from 'Store/Helpers/useAppStore';


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
  const appStore = useAppStore();
 
  useEffect(()=>{
    const action = actionStore?.popAction();
    switch(action?.name){
      case BATCH_REMOVE_LIST_VIEW_RECORDS:
        onExcuteBatchRemove();
        break;
      case BATCH_UPDATE_LIST_VIEW_RECORDS:
        break;
      
      default:
        action && onPageAction(action);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[actionStore?.waitingActions.length])

  return (
   <Fragment>
   </Fragment>
  );
})

export default ListViewActionHunter;

