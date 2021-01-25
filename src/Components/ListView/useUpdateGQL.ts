import { GraphQLStore } from "Base/GraphQL/GraphQLStore";
import { useState, useEffect } from "react";
import intl from "react-intl-universal";
import { ListViewStore } from "./ListViewStore";
import { IPageMutation } from "Base/Model/IPageMutation";
import { usePageStore } from "Base/PageUtils/PageStore";
import { getNodeGraphQL } from "Base/PageUtils/getNodeGraphQL";
import { IMeta } from "Base/RXNode/IMeta";
import { RxNode } from "rx-drag/RxNode";

export function useUpdateGQL( rxNode:RxNode<IMeta>, listViewStore:ListViewStore, update?:IPageMutation ){
  const pageStore = usePageStore();

  const createQueryGQL = ()=>{
    const GQL_STRING = `
      mutation ($${update?.variableName}:${update?.variableType}, $ids:[ID]){
        ${update?.name}(${update?.variableName}:$${update?.variableName}, ids:$ids)
        ${getNodeGraphQL(rxNode)}
      }
  `
    //console.log('ListView query GQL', GQL_STRING)
    return GQL_STRING;
  }

  const [queryGQL] = useState(new GraphQLStore(intl.get('data-update'), 'ListView', createQueryGQL()));

  useEffect(()=>{
    pageStore?.addGql(queryGQL);
    return ()=>{
      pageStore?.removeGql(queryGQL);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  useEffect(()=>{
    queryGQL.setVariables({ids:[], [`${update?.variableName}`]:{}})
    queryGQL.setGql(createQueryGQL());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[update])

  return queryGQL;
}