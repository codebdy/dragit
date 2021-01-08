import { GraphQLStore } from "base/GraphQL/GraphQLStore";
import { useState, useEffect } from "react";
import { resolveFieldGQL } from "../Displays/CellRenders";
import { IColumn } from "./IColumn";
import intl from "react-intl-universal";
import { usePageGQLStore } from "base/GraphQL/PageGQLProvider";
import { IQueryParam } from "./IQueryParam";

export function useQueryGQL( columns:Array<IColumn>, query:string|undefined, queryParam: IQueryParam ){
  const pageGQLStore = usePageGQLStore();
  
  const createQueryGQL = ()=>{
    let fields = ''
    columns?.forEach((colum)=>{
      fields = fields + ' ' + resolveFieldGQL(colum);
    })

    const GQL_STRING = `
      query ($first:Int, $page:Int, $where: JSON, $orderBy: JSON){
        ${query}(first:$first, page:$page, where:$where, orderBy:$orderBy){
          data {
              id
              ${fields}
            }
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
    pageGQLStore?.addQuery(queryGQL);
    return ()=>{
      pageGQLStore?.removeQuery(queryGQL);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
    queryGQL.setVariables({...queryParam})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[queryParam])

  return queryGQL;
}