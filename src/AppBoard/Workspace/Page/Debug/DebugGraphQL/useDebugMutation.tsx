import { gql, useMutation } from "@apollo/react-hooks";
import { parse } from 'graphql';

export function useDebugMutation(graphiQL?:string){
  let graphiQLStr = graphiQL;
  if(!graphiQL || !graphiQL.startsWith('mutation')){
    graphiQLStr = 'mutation{empty}'
  }

  try{
    parse(graphiQL||'');
  }
  catch(e){
    graphiQLStr = 'mutation{empty}'
  }
  return useMutation(gql`${graphiQLStr}`,{
    notifyOnNetworkStatusChange: true,
    fetchPolicy:'no-cache'
  });
}