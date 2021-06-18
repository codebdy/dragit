import useLayzyMagicPost from "Data/useLayzyMagicPost";

export function useDebugMutation(graphiQL?:string){
  let graphiQLStr = graphiQL;
  if(!graphiQL || !graphiQL.startsWith('mutation')){
    graphiQLStr = 'mutation{empty}'
  }

  try{
   // parse(graphiQL||'');
  }
  catch(e){
    graphiQLStr = 'mutation{empty}'
  }
  return useLayzyMagicPost({
  });
}