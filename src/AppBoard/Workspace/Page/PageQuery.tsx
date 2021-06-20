import { useModelStore } from "Base/ModelTree/ModelProvider";
import { usePageStore } from "Base/PageUtils/PageStore";
import { MagicQueryBuilder } from "Data/MagicQueryBuilder";
import { MagicQueryMeta } from "Data/MagicQueryMeta";
import { useMagicQuery } from "Data/useMagicQuery";
import { observer } from "mobx-react";
import React, { useEffect } from "react"
import { Fragment } from "react"
import { ID } from "rx-drag/models/baseTypes";
import { useShowServerError } from "Store/Helpers/useInfoError";

export const PageQuery = observer((
  props:{
    query:string,
    id:ID
  }
)=>{
  const {query, id} = props;
  const modelStore = useModelStore();
  const queryMeta = new MagicQueryMeta(query);
  queryMeta.addCondition('id', id);
  const { loading, error, data } = useMagicQuery(
    new MagicQueryBuilder()
      .setQueryString(queryMeta.toQueryString())
  );

  console.log(loading);
  useEffect(()=>{
    modelStore?.setLoading(loading);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(()=>{
    if(data){
      modelStore?.initWithModel(data?.data);      
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