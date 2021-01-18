import { GraphQLStore } from "Base/GraphQL/GraphQLStore";
import { useState, useEffect } from "react";
import intl from "react-intl-universal";
import { ListViewStore } from "./ListViewStore";
import { IPageMutation } from "Base/Model/IPageMutation";
import { usePageStore } from "Base/PageUtils/PageStore";
import { getNodeGraphQL } from "Base/PageUtils/getNodeGraphQL";
import { useRXNode } from "Base/RXNode/RXNodeProvider";

export function useUpdateGQL( listViewStore:ListViewStore, update?:IPageMutation ){
  const pageStore = usePageStore();
  const rxNode = useRXNode();

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