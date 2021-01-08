import intl from 'react-intl-universal';
import { GraphQLStore } from "base/GraphQL/GraphQLStore";
import { useEffect, useState } from "react";
import { usePageGQLStore } from 'base/GraphQL/PageGQLProvider';
import { IQueryParam } from './IQueryParam';
import { ID } from 'base/Model/graphqlTypes';


export function useMutationGQL( mutation:String|undefined, selected:ID[], queryParam: IQueryParam ){
  const pageGQLStore = usePageGQLStore();

  const createMutationGQL = ()=>{
    const MUTATION_GQL = `
      mutation ($command:String!, $ids:[String!]!){
        ${mutation||'empty'}(command:$command, ids:$ids){
          id
        }
      }
    `;

    return MUTATION_GQL;
  }

  const [mutationGQL] = useState(new GraphQLStore(intl.get('list-update'), 'ListView', createMutationGQL()));

  useEffect(()=>{
    mutationGQL.setVariables({...mutationGQL.variables, ...queryParam, ids:selected, command:''})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[queryParam, selected])

  useEffect(()=>{
    pageGQLStore?.addQuery(mutationGQL);
    return ()=>{
      pageGQLStore?.removeQuery(mutationGQL);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return mutationGQL;
}