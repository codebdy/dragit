import { useLazyQuery, gql } from "@apollo/react-hooks";
import { GraphQLStore } from "Base/GraphQL/GraphQLStore";
import { useModelStore } from "Base/ModelTree/ModelProvider";
import { usePageStore } from "Base/PageUtils/PageStore";
import { observer } from "mobx-react";
import React, { useEffect } from "react"
import { Fragment } from "react"
import { useShowAppoloError } from "Store/Helpers/useInfoError";

export const PageQuery = observer((
  props:{
    queryGQL:GraphQLStore
  }
)=>{
  const {queryGQL} = props;
  const modelStore = useModelStore();
  const pageStore = usePageStore();
  const queryName = pageStore?.page.schema?.query;
  const [excuteQuery, { loading, error, data }] = useLazyQuery(gql`${queryGQL.gql}`, {
    variables: { ...queryGQL.variables },
    notifyOnNetworkStatusChange: true,
    fetchPolicy:'no-cache'
  });
  useEffect(()=>{
    excuteQuery();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    modelStore?.setLoading(loading);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(()=>{
    if(data){
      modelStore?.setModel(data[queryName||'']);      
    }
    else{
      modelStore?.setModel(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useShowAppoloError(error);
  return (
    <Fragment></Fragment>
  )
})