import { GraphQLStore } from "Base/GraphQL/GraphQLStore";
import { useState, useEffect } from "react";
import intl from "react-intl-universal";
import { IPageJumper } from "Base/Model/IPageJumper";
import { PageStore } from "Base/PageUtils/PageStore";

export function usePageQueryGQL( pageStore?:PageStore, queryName?:string, pageJumper?:IPageJumper ){
   const createQueryGQL = ()=>{
    const GQL_STRING = `
      query ($id:ID){
        ${queryName}(id:$id)
        ${pageStore?.getFieldsGQL()} 
      }
    `;
    //console.log('Page query GQL', GQL_STRING)
    return GQL_STRING;
  }

  const [queryGQL] = useState(new GraphQLStore(intl.get('data-query'), 'Page', createQueryGQL()));

  useEffect(()=>{
    queryGQL.setGql(createQueryGQL());
    queryGQL.setVariables({id:pageJumper?.dataId})
    if(queryName){
      pageStore?.addGql(queryGQL);
      return ()=>{
        pageStore?.removeGql(queryGQL);
      }      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageStore?.page, pageJumper])

  return queryGQL;
}