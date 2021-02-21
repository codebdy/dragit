import { useEffect } from "react";
import { useDragItStore } from "./useDragItStore";
import { gql, useApolloClient, useLazyQuery } from "@apollo/react-hooks";
import { TOKEN_NAME, LOGIN_URL } from "Utils/consts";
import { useShowAppoloError } from "./useInfoError";
import { creatLink } from "client";
import { QUERY_ME } from "Base/GraphQL/LOGIN_GQLs";
import { useHistory } from "react-router-dom";


export function useLoginCheck() {
  const localToken = localStorage.getItem(TOKEN_NAME);
  const history = useHistory();
  const client = useApolloClient();
  const [excuteQuery, { error }] = useLazyQuery(gql`${QUERY_ME}`,{
    notifyOnNetworkStatusChange: true,
    onCompleted(data){
      if(data?.me){        
        appStore.setLoggedUser(data.me);
      }
      else{
        localStorage.removeItem(TOKEN_NAME);
        history?.push(LOGIN_URL);
      }
    }
  });
  //const { loading, error, data } = useQuery(LOGIN,);
  const appStore = useDragItStore();
  
  useShowAppoloError(error);

  useEffect(()=>{
    if(!appStore.loggedUser && !localToken){
      console.log('useLoginCheck',appStore.loggedUser, localToken, LOGIN_URL)
      history?.push(LOGIN_URL);
    }
    if(!appStore.loggedUser && localToken){      
      client.setLink(creatLink(localToken));
      excuteQuery()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

}