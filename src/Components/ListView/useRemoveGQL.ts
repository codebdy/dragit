import { GraphQLStore } from "Base/GraphQL/GraphQLStore";
import { IMeta } from "Base/RXNode/IMeta";
import { getNodeGraphQL } from "Base/PageUtils/getNodeGraphQL";
import { usePageStore } from "Base/PageUtils/PageStore";
import { RXNode } from "Base/RXNode/RXNode";
import { useState, useEffect } from "react";
import intl from "react-intl-universal";
import { ListViewStore } from "./ListViewStore";

export function useRemoveGQL( rxNode:RXNode<IMeta>, listViewStore:ListViewStore, remove?:string ){
  const pageStore = usePageStore();

  const createQueryGQL = ()=>{
    const GQL_STRING = `
      mutation ($ids:[ID]){
        ${remove}(ids:$ids)
        ${getNodeGraphQL(rxNode)}
      }
  `
    //console.log('ListView query GQL', GQL_STRING)
    return GQL_STRING;
  }

  const [queryGQL] = useState(new GraphQLStore(intl.get('data-remove'), 'ListView', createQueryGQL()));

  useEffect(()=>{
    pageStore?.addGql(queryGQL);
    return ()=>{
      pageStore?.removeGql(queryGQL);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
    queryGQL.setVariables({ids:[]});
    queryGQL.setGql(createQueryGQL());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[remove])

  return queryGQL;
}