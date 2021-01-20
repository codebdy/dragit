import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { ID } from 'Base/Model/graphqlTypes';
import { useDesign } from '../useDesign';
import { useEffect } from 'react';
const RefreshHunter = observer(React.forwardRef((
    props:{
      nodeId:ID,
      onRefresh:()=>void,
    }, 
    ref:any
  )=>{

  const {
    nodeId,
    onRefresh,
  } = props
  const {eidtorStore} = useDesign();

  useEffect(()=>{
    if(eidtorStore?.needRefresh(nodeId)){
      onRefresh();
      eidtorStore?.finishFrefrehNode(nodeId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[eidtorStore?.waitingRefreshNodeIds.length])

  return (
   <Fragment></Fragment>
  );
}))

export default RefreshHunter;

