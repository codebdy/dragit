import { useLazyQuery, gql, useMutation } from '@apollo/react-hooks';
import { Paper } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useAppStore } from 'Store/Helpers/useAppStore';
import { useShowAppoloError } from 'Store/Helpers/useInfoError';
import { ListViewStore, ListViewStoreProvider } from './ListViewStore';
import { useQueryGQL } from './useQueryGQL';
import { observer } from 'mobx-react'
import { useEffect } from 'react';
import { useRemoveGQL } from './useRemoveGQL';
import { useUpdateGQL } from './useUpdateGQL';
import { IPageMutation } from 'Base/Model/IPageMutation';
import ListViewActionFilter from './ListViewActionFilter';
import { ID } from 'Base/Model/graphqlTypes';

function creatEmpertyRows(length:number){
  let rows = []
  for(var i = 0; i < length; i++){
    rows.push({id:i+1});
  }

  return rows;
}

const ListView = observer(React.forwardRef((
    props:{
      query?:string,
      update?:IPageMutation,
      remove?:string,
      children?:any,
    }, 
    ref:any
  )=>{

  const {
    query,
    update,
    remove,
    children,
    ...rest
  } = props
  
  const [listViewStore] = useState(new ListViewStore())
  
  const appStore = useAppStore();
  const queryGQL = useQueryGQL( listViewStore, query );
  const updateGQL = useUpdateGQL( listViewStore, update );
  const removeGQL = useRemoveGQL( listViewStore, remove );

  //const mutationGQL = useMutationGQL(mutation, selected);
  const [excuteQuery, { called, loading:queryLoading, error, data, refetch }] = useLazyQuery(gql`${queryGQL.gql}`, {
    notifyOnNetworkStatusChange: true,
    //fetchPolicy:'no-cache'
  });

  const [excuteUpdate, { error:updateError }] = useMutation(gql`${updateGQL.gql}`,
    {
      onCompleted:()=>{
        appStore.setSuccessAlert(true);
        listViewStore.setSelects([]);
        listViewStore.finishMutation();
      }
    }
  );

  const [excuteRemove, { error:removeError }] = useMutation(gql`${removeGQL.gql}`,
    {
      onCompleted:()=>{
        appStore.setSuccessAlert(true);
        listViewStore.setSelects([]);
        listViewStore.finishMutation();
      }
    }
  );

  useShowAppoloError(error||updateError||removeError);

  useEffect(()=>{
    if(!query){
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
    listViewStore.setLoading(queryLoading);
    queryLoading && !data && listViewStore.setRows(creatEmpertyRows(listViewStore.paginatorInfo.perPage));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[queryLoading])


  useEffect(()=>{
    !queryLoading && listViewStore.setRows(data && query ? data[query]?.data:[]);
    listViewStore.paginatorInfo.setQueryResult(data && query ? data[query]?.paginatorInfo:{});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data])

  const handelBatchRemove = ()=>{
    listViewStore.setRemovingSelects();
    //listViewStore.setSelects([]);
    excuteRemove({variables:{
      ids:listViewStore.selects
    }})
  }

  const handleBatchUpadate = (field:string, value:any)=>{
    if(!update){
      return;
    }
    listViewStore.setUpdatingSelects(field);
    excuteUpdate({variables:{
      ids:listViewStore.selects,
      [update.variableName]:{[field]:value},
    }})
  }

  const handleUpdate = (id:ID, field:string, value:any)=>{
    if(!update){
      return;
    }
    listViewStore.setUpdating(id, field);
    excuteUpdate({variables:{
      ids:[id],
      [update.variableName]:{[field]:value},
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

