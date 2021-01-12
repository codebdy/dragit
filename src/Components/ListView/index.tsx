import { useLazyQuery, gql, useMutation } from '@apollo/react-hooks';
import { Paper } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useAppStore } from 'Store/Helpers/useAppStore';
import { useShowAppoloError } from 'Store/Helpers/useInfoError';
import { ListViewStore, ListViewStoreProvider } from './ListViewStore';
import { useMutationGQL } from './useMutationGQL';
import { useQueryGQL } from './useQueryGQL';
import { observer } from 'mobx-react'
import { useEffect } from 'react';
import { ActionStore, ActionStoreProvider, useActionStore } from 'Base/Action/ActionStore';
import { REGISTER_ACTION_TO_GQL_STORE, REMOVE_ACTION_FROM_GQL_STORE } from 'Base/Action/PageAction';
import { useRemoveGQL } from './useRemoveGQL';
import { useUpdateGQL } from './useUpdateGQL';

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
      update?:string,
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
  const [actionStore] = useState(new ActionStore());
  const appStore = useAppStore();
  const parentActionStore = useActionStore();
  const queryGQL = useQueryGQL( listViewStore, query );
  const updateGQL = useUpdateGQL( listViewStore, query );
  const removeGQL = useRemoveGQL( listViewStore, query );
  //const mutationGQL = useMutationGQL(mutation, selected);
  const [excuteQuery, { called, loading:queryLoading, error, data, refetch }] = useLazyQuery(gql`${queryGQL.gql}`, {
    notifyOnNetworkStatusChange: true,
    //fetchPolicy:'no-cache'
  });

  //const [excuteMutation, { loading:mutationLoading, error:mutationsError, data:mutationResult }] = useMutation(gql`${mutationGQL.gql}`,
  //  {onCompleted:()=>{appStore.setSuccessAlert(true)}}
  //);
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
  useShowAppoloError(error);

  useEffect(()=>{
    if(parentActionStore && parentActionStore.waitingActions.length > 0){
      const action = parentActionStore.popAction();
      if(action?.name === REGISTER_ACTION_TO_GQL_STORE){

      }

      if(action?.name === REMOVE_ACTION_FROM_GQL_STORE){
        
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[parentActionStore?.waitingActions.length])

  return (
    <ActionStoreProvider value = {actionStore}>
      <ListViewStoreProvider value = {listViewStore}>
        <Paper {...rest}  ref={ref}>
          {children}
        </Paper>
      </ListViewStoreProvider>
    </ActionStoreProvider>
  );
}))

export default ListView;

