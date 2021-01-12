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
      children?:any,
    }, 
    ref:any
  )=>{

  const {
    query,
    children,
    ...rest
  } = props
  
  const [listViewStore] = useState(new ListViewStore())
  const appStore = useAppStore();
  const queryGQL = useQueryGQL( listViewStore, query );
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

  return (
    <ListViewStoreProvider value = {listViewStore}>
      <Paper {...rest}  ref={ref}>
        {children}
      </Paper>
    </ListViewStoreProvider>
  );
}))

export default ListView;

