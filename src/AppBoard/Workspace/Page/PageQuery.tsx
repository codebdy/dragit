import { useModelStore } from "Base/ModelTree/ModelProvider";
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

  useEffect(()=>{
    modelStore?.setLoading(loading);
  }, [loading, modelStore]);

  useEffect(()=>{
    if(data){
      modelStore?.initWithModel(data.data);      
    }
  },[data, modelStore]);

  useShowServerError(error);
  return (
    <Fragment></Fragment>
  )
})