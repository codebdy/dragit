import { GraphQLStore } from "Base/GraphQL/GraphQLStore";
import { useState, useEffect } from "react";
import intl from "react-intl-universal";
import { usePageGQLStore } from "Base/GraphQL/PageGQLProvider";
import { ListViewStore } from "./ListViewStore";

export function useRemoveGQL( listViewStore:ListViewStore, remove?:string ){
  const pageGQLStore = usePageGQLStore();

  const createQueryGQL = ()=>{
    const GQL_STRING = `
      query ($first:Int, $page:Int){
        ${remove}(first:$first, page:$page, where:${listViewStore.toWhereGaphiQL()}, orderBy:${listViewStore.toOrderByGraphiQL()}){
          data 
            ${listViewStore.rowSchemaStore.toFieldsGQL()}
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

  const [queryGQL] = useState(new GraphQLStore(intl.get('list-query'), 'ListView', createQueryGQL()));

  useEffect(()=>{
    pageGQLStore?.addGql(queryGQL);
    return ()=>{
      pageGQLStore?.removeGql(queryGQL);
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
  },[listViewStore.rowSchemaStore.fields.size, remove, listViewStore.refreshQueryFlag])

  return queryGQL;
}