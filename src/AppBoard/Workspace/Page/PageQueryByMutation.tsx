import { gql, useMutation } from "@apollo/react-hooks";
import { GraphQLStore } from "Base/GraphQL/GraphQLStore";
import { useModelStore } from "Base/ModelTree/ModelProvider";
import { usePageStore } from "Base/PageUtils/PageStore";
import { observer } from "mobx-react";
import React, { useEffect } from "react"
import { Fragment } from "react"
import { useShowServerError } from "Store/Helpers/useInfoError";

export const PageQueryByMutation = observer((
  props:{
    queryGQL:GraphQLStore
  }
)=>{
  const {queryGQL} = props;
  const modelStore = useModelStore();
  const pageStore = usePageStore();
  const queryName = pageStore?.page.query;
  const [ excuteMutation, { loading, error, data }] = useMutation(gql`${queryGQL.gql}`, {
    variables: { ...queryGQL.variables },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(()=>{
    excuteMutation();
  },[excuteMutation, queryGQL]);

  useEffect(()=>{
    modelStore?.setLoading(loading);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(()=>{
    if(data){
      modelStore?.initWithModel(data[queryName||'']);      
    }
    else{
      modelStore?.initWithModel(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useShowServerError(error);
  return (
    <Fragment></Fragment>
  )
})