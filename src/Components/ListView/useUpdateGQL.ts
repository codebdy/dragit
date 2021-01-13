import { GraphQLStore } from "Base/GraphQL/GraphQLStore";
import { useState, useEffect } from "react";
import intl from "react-intl-universal";
import { usePageGQLStore } from "Base/GraphQL/PageGQLProvider";
import { ListViewStore } from "./ListViewStore";
import { IPageMutation } from "Base/Model/IPageMutation";

export function useUpdateGQL( listViewStore:ListViewStore, update?:IPageMutation ){
  const pageGQLStore = usePageGQLStore();

  const createQueryGQL = ()=>{
    const GQL_STRING = `
      mutation ($${update?.variableName}:${update?.variableType}, $ids:[ID]){
        ${update?.name}(${update?.variableName}:$${update?.variableName}, ids:$ids)
        ${listViewStore.rowSchemaStore.toFieldsGQL()}
      }
  `
    //console.log('ListView query GQL', GQL_STRING)
    return GQL_STRING;
  }

  const [queryGQL] = useState(new GraphQLStore(intl.get('data-update'), 'ListView', createQueryGQL()));

  useEffect(()=>{
    pageGQLStore?.addGql(queryGQL);
    return ()=>{
      pageGQLStore?.removeGql(queryGQL);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  useEffect(()=>{
    queryGQL.setVariables({ids:[], [`${update?.variableName}`]:{}})
    queryGQL.setGql(createQueryGQL());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[update])

  return queryGQL;
}