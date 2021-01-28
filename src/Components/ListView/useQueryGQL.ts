import { GraphQLStore } from "Base/GraphQL/GraphQLStore";
import { IMeta } from "Base/RXNode/IMeta";
import { getNodeGraphQL } from "Base/PageUtils/getNodeGraphQL";
import { usePageStore } from "Base/PageUtils/PageStore";
import { RxNode } from "rx-drag/models/RxNode";
import { useState, useEffect } from "react";
import intl from "react-intl-universal";
import { ListViewStore } from "./ListViewStore";

export function useQueryGQL( rxNode:RxNode<IMeta>, listViewStore:ListViewStore, query?:string ){
  const pageStore = usePageStore();

  const createQueryGQL = ()=>{
    const GQL_STRING = `
      query ($first:Int, $page:Int){
        ${query}(first:$first, page:$page, where:${listViewStore.toWhereGaphiQL()}, orderBy:${listViewStore.toOrderByGraphQL()}){
          data 
            ${getNodeGraphQL(rxNode)}
            paginatorInfo {
              count
              currentPage
              hasMorePages
              lastPage
              perPage
              total
            }
        }
      }
  `
    //console.log('ListView query GQL', GQL_STRING)
    return GQL_STRING;
  }

  const [queryGQL] = useState(new GraphQLStore(intl.get('data-query'), 'ListView', createQueryGQL()));

  useEffect(()=>{
    pageStore?.addGql(queryGQL);
    return ()=>{
      pageStore?.removeGql(queryGQL);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
    queryGQL.setVariables({first:listViewStore.paginatorInfo.perPage, page:listViewStore.paginatorInfo.currentPage})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[listViewStore.paginatorInfo.perPage, listViewStore.paginatorInfo.currentPage])

  useEffect(()=>{
    queryGQL.setGql(createQueryGQL());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[rxNode, query, listViewStore.refreshQueryFlag])

  return queryGQL;
}