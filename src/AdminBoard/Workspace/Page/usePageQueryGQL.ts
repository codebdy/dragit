import { GraphQLStore } from "Base/GraphQL/GraphQLStore";
import { useState, useEffect } from "react";
import intl from "react-intl-universal";
import { ModelStore } from "Base/ModelTree/ModelStore";
import { IPageJumper } from "Base/Model/IPageJumper";
import { PageGQLStore } from "Base/GraphQL/PageGQLStore";

export function usePageQueryGQL( modelStore:ModelStore, pageGQLStore:PageGQLStore, queryName?:string, pageParams?:IPageJumper ){
   const createQueryGQL = ()=>{
    const GQL_STRING = `
      query ($id:ID){
        ${queryName}(id:$id)
        ${modelStore.toFieldsGQL()} 
      }
    `;
    //console.log('Page query GQL', GQL_STRING)
    return GQL_STRING;
  }

  const [queryGQL] = useState(new GraphQLStore(intl.get('data-query'), 'Page', createQueryGQL()));

  useEffect(()=>{
    if(queryName){
      pageGQLStore?.addGql(queryGQL);
      return ()=>{
        pageGQLStore?.removeGql(queryGQL);
      }      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[queryName])

  useEffect(()=>{
    queryGQL.setVariables({id:pageParams?.dataId})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pageParams?.dataId])

  useEffect(()=>{
    queryGQL.setGql(createQueryGQL());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[queryName, modelStore.fields.size])

  return queryGQL;
}