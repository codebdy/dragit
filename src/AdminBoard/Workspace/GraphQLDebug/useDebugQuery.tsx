import { useLazyQuery, gql } from "@apollo/react-hooks";
import { parse } from 'graphql';

export function useDebugQuery(graphiQL?:string){
  let graphiQLStr = graphiQL;
  if(!graphiQL || !graphiQL.startsWith('query')){
    graphiQLStr = 'query{empty}'
  }

  try{
    parse(graphiQL||'');
  }
  catch(e){
    graphiQLStr = 'query{empty}'
  }
  return useLazyQuery(gql`${graphiQLStr}`,{
    notifyOnNetworkStatusChange: true
  });
}