import { useLazyQuery, gql, useMutation } from '@apollo/react-hooks';
import { Paper } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useDragItStore } from 'Store/Helpers/useDragItStore';
import { useShowAppoloError } from 'Store/Helpers/useInfoError';
import { ListViewStore, ListViewStoreProvider } from './ListViewStore';
import { useQueryGQL } from './useQueryGQL';
import { observer } from 'mobx-react'
import { useEffect } from 'react';
import { useRemoveGQL } from './useRemoveGQL';
import { useUpdateGQL } from './useUpdateGQL';
import { IPageMutation } from 'Base/Model/IPageMutation';
import ListViewActionFilter from './ListViewActionFilter';
import { ID } from 'rx-drag/models/baseTypes';
import { useDesign } from 'rx-drag/store/useDesign';
import { useModelStore } from 'Base/ModelTree/ModelProvider';
import { IMeta } from 'Base/RXNode/IMeta';
import { RxNode } from 'rx-drag/models/RxNode';

function creatEmpertyRows(length:number){
  let rows = []
  for(var i = 0; i < length; i++){
    rows.push({id:i+1});
  }

  return rows;
}

const ListView = observer(React.forwardRef((
    props:{
      rxNode:RxNode<IMeta>,
      query?:string,
      update?:IPageMutation,
      remove?:string,
      children?:any,
      selectable?:boolean,
    }, 
    ref:any
  )=>{

  const {
    rxNode,
    query,
    update,
    remove,
    children,
    selectable = true,
    ...rest
  } = props
  
  const [listViewStore] = useState(new ListViewStore())
  
  const appStore = useDragItStore();
  const queryGQL = useQueryGQL( rxNode, listViewStore, query );
  const updateGQL = useUpdateGQL( rxNode, listViewStore, update );
  const removeGQL = useRemoveGQL( rxNode, listViewStore, remove );
  const {isDesigning} = useDesign();
  const modelStore = useModelStore();

  useEffect(()=>{
    listViewStore.setSelectable(selectable);
  },[listViewStore, selectable])

  useEffect(()=>{
    if(listViewStore.rxModel){
      const label = 'ListView' + listViewStore.rxModel?.node.id;
      listViewStore.rxModel.setLabel(label);
      modelStore?.setChild(label, listViewStore.rxModel)
    }    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[listViewStore.rxModel]);

  const [excuteQuery, { called, loading:queryLoading, error, data, refetch }] = useLazyQuery(gql`${queryGQL.gql}`, {
    notifyOnNetworkStatusChange: true,
    //fetchPolicy:'no-cache'
  });


  const [excuteUpdate, { error:updateError }] = useMutation(gql`${updateGQL.gql}`,
    {
      onCompleted:(data)=>{
        appStore.setSuccessAlert(true);
        listViewStore.setSelects([]);
        listViewStore.finishMutation();
      }
    }
  );

  const [excuteRemove, { error:removeError }] = useMutation(gql`${removeGQL.gql}`,
    {
      onCompleted:(data)=>{
        appStore.setSuccessAlert(true);
        listViewStore.setSelects([]);
        listViewStore.finishMutation();
      }
    }
  );

  useShowAppoloError(error||updateError||removeError);

  useEffect(()=>{
    if(!query || isDesigning){
      return;
    }
    if(!called){
      excuteQuery({variables:listViewStore.getQueryVariables()});
    }
    else{
      refetch && refetch(listViewStore.getQueryVariables());
    }
    listViewStore.setSelects([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[listViewStore.refreshQueryFlag])

  useEffect(()=>{
    queryLoading && !data && listViewStore.setRows(creatEmpertyRows(listViewStore.paginatorInfo.perPage));
    listViewStore.setLoading(queryLoading);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[queryLoading])


  useEffect(()=>{
    if(data){
      !queryLoading && listViewStore.setRows(data && query ? data[query]?.data:[]);
      listViewStore.paginatorInfo.setQueryResult(data && query ? data[query]?.paginatorInfo:{});      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data])

  const handelBatchRemove = ()=>{
    listViewStore.setRemovingSelects();
    excuteRemove({variables:{
      ids:listViewStore.selects
    }})
  }

  const handleBatchUpadate = (field:string, value:any)=>{
    if(!update){
      return;
    }
    listViewStore.setUpdatingSelects(field);
    const varilabes = update.variableName ? {[update.variableName]:{[field]:value}} : undefined;
    excuteUpdate({variables:{
      ids:listViewStore.selects,
      ...varilabes,
    }})
  }

  const handleUpdate = (id:ID, field:string, value:any)=>{
    if(!update){
      return;
    }
    listViewStore.setUpdating(id, field);
    const varilabes = update.variableName ? {[update.variableName]:{[field]:value}} : undefined;
    excuteUpdate({variables:{
      ids:[id],
      ...varilabes,
    }})
  }

  const handelReomve = (id:ID)=>{
    listViewStore.setRemoving(id);
    excuteRemove({variables:{
      ids:[id]
    }})
  }

  return (
    <ListViewActionFilter
      onExcuteBatchRemove = {handelBatchRemove}
      onExcuteBatchUpdate = {handleBatchUpadate}
      onExcuteUpdate = {handleUpdate}
      onExcuteRemove = {handelReomve}
    >
      <ListViewStoreProvider value = {listViewStore}>
        <Paper {...rest}  ref={ref}>
          {children}
        </Paper>
      </ListViewStoreProvider>
    </ListViewActionFilter>
  );
}))

export default ListView;

