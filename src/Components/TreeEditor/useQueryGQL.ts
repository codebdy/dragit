import { GraphQLStore } from "Base/GraphQL/GraphQLStore";
import { usePageStore } from "Base/PageUtils/PageStore";
import { useState, useEffect } from "react";
import intl from "react-intl-universal";

export function useQueryGQL(query?:string ){
  const pageStore = usePageStore();
  console.assert(typeof query === 'string', 'query名必须是String类型');
  const createQueryGQL = ()=>{
    const GQL_STRING = `query ${query} {${query}}`;
    
    return GQL_STRING;
  }

  const [queryGQL] = useState(new GraphQLStore(intl.get('data-query'), 'TreeEditor', createQueryGQL()));

  useEffect(()=>{
    pageStore?.addGql(queryGQL);
    return ()=>{
      pageStore?.removeGql(queryGQL);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  useEffect(()=>{
    queryGQL.setGql(createQueryGQL());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[query])

  return queryGQL;
}