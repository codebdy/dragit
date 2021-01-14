import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { useActionStore } from 'Base/Action/ActionStore';
import { PageAction } from 'Base/Action/PageAction';
import { useEffect } from 'react';
const ActionHunter = observer((
    props:{
      onPageAction:(action:PageAction)=>void,
    }
  )=>{

  const {
    onPageAction,
  } = props
  const actionStore = useActionStore();
  useEffect(()=>{
    if(actionStore?.hasAction()){
      const action = actionStore.popAction();
      if(action){
        onPageAction(action);        
      }    
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionStore?.waitingActions.length])


  return (
   <Fragment></Fragment>
  );
})

export default ActionHunter;

