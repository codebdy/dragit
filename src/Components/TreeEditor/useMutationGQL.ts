import { GraphQLStore } from "Base/GraphQL/GraphQLStore";
import { useState, useEffect } from "react";
import intl from "react-intl-universal";
import { usePageStore } from "Base/PageUtils/PageStore";

export function useMutationGQL( mutation?:string ){
  const pageStore = usePageStore();

  const createQueryGQL = ()=>{
    const GQL_STRING = `
      mutation ($tree:JSON){
        ${mutation}(tree:$tree)
      }
  `
    return GQL_STRING;
  }

  const [mutationGQL] = useState(new GraphQLStore(intl.get('data-update'), 'ListView', createQueryGQL()));

  useEffect(()=>{
    pageStore?.addGql(mutationGQL);
    return ()=>{
      pageStore?.removeGql(mutationGQL);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
    mutationGQL.setGql(createQueryGQL());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[mutation])

  return mutationGQL;
}