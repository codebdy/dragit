import intl from 'react-intl-universal';
import { GraphQLStore } from "base1/GraphQL/GraphQLStore";
import { useEffect, useState } from "react";
import { usePageGQLStore } from 'base1/GraphQL/PageGQLProvider';
import { ID } from 'base1/Model/graphqlTypes';


export function useMutationGQL( mutation:String|undefined, selected:ID[] ){
  const pageGQLStore = usePageGQLStore();

  const createMutationGQL = ()=>{
    const MUTATION_GQL = `
      mutation ($command:String!, $ids:[String!]!){
        ${mutation}(command:$command, ids:$ids){
          id
        }
      }
    `;

    return MUTATION_GQL;
  }

  const [mutationGQL] = useState(new GraphQLStore(intl.get('list-update'), 'ListView', createMutationGQL()));

  useEffect(()=>{
    mutationGQL.setVariables({...mutationGQL.variables, ids:selected, command:''})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selected])

  useEffect(()=>{
    pageGQLStore?.addQuery(mutationGQL);
    return ()=>{
      pageGQLStore?.removeQuery(mutationGQL);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return mutationGQL;
}