import { GraphQLStore } from "Base/GraphQL/GraphQLStore";
import { getNodeGQL } from "Base/PageUtils/getNodeGQL";
import { usePageStore } from "Base/PageUtils/PageStore";
import { useRXNode } from "Base/RXNode/RXNodeProvider";
import { useState, useEffect } from "react";
import intl from "react-intl-universal";
import { ListViewStore } from "./ListViewStore";

export function useQueryGQL( listViewStore:ListViewStore, query?:string ){
  const pageStore = usePageStore();

  const rxNode = useRXNode();

  const createQueryGQL = ()=>{
    const GQL_STRING = `
      query ($first:Int, $page:Int){
        ${query}(first:$first, page:$page, where:${listViewStore.toWhereGaphiQL()}, orderBy:${listViewStore.toOrderByGraphiQL()}){
          data 
            ${getNodeGQL(rxNode)}
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