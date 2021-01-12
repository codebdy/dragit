import { GraphQLStore } from "Base/GraphQL/GraphQLStore";
import { useState, useEffect } from "react";
import intl from "react-intl-universal";
import { usePageGQLStore } from "Base/GraphQL/PageGQLProvider";
import { ListViewStore } from "./ListViewStore";

export function useRemoveGQL( listViewStore:ListViewStore, remove?:string ){
  const pageGQLStore = usePageGQLStore();

  const createQueryGQL = ()=>{
    const GQL_STRING = `
      mutation ($ids:[ID]){
        ${remove}(ids:$ids)
        ${listViewStore.rowSchemaStore.toFieldsGQL()}
      }
  `
    //console.log('ListView query GQL', GQL_STRING)
    return GQL_STRING;
  }

  const [queryGQL] = useState(new GraphQLStore(intl.get('data-remove'), 'ListView', createQueryGQL()));

  useEffect(()=>{
    pageGQLStore?.addGql(queryGQL);
    return ()=>{
      pageGQLStore?.removeGql(queryGQL);
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