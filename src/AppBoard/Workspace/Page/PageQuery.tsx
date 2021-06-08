import { gql, useQuery } from "@apollo/react-hooks";
import { GraphQLStore } from "Base/GraphQL/GraphQLStore";
import { useModelStore } from "Base/ModelTree/ModelProvider";
import { usePageStore } from "Base/PageUtils/PageStore";
import { observer } from "mobx-react";
import React, { useEffect } from "react"
import { Fragment } from "react"
import { useShowServerError } from "Store/Helpers/useInfoError";

export const PageQuery = observer((
  props:{
    queryGQL:GraphQLStore
  }
)=>{
  const {queryGQL} = props;
  const modelStore = useModelStore();
  const pageStore = usePageStore();
  const queryName = pageStore?.page.query;
  const { loading, error, data } = useQuery(gql`${queryGQL.gql}`, {
    variables: { ...queryGQL.variables },
    notifyOnNetworkStatusChange: true,
    fetchPolicy:'no-cache'
  });

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