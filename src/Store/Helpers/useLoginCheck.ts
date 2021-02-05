import { useEffect } from "react";
import { useHistory } from "react-router";
import { useDragItStore } from "./useDragItStore";
import { gql, useLazyQuery } from "@apollo/react-hooks";
import { TOKEN_NAME, LOGIN_URL } from "Utils/consts";

// 定义查询语句
const QUERY_USER = gql`
  query ($token: String!){
    userByToken(token:$token){
      id
      login_name
      name
      is_demo
      is_supper
      avatar{
        id
        thumbnail
        title
        src
      }
      auths 
    }
  }
`;

export function useLoginCheck() {
  const localToken = localStorage.getItem(TOKEN_NAME);
  const history = useHistory();
  const [excuteQuery, { loading, error, data }] = useLazyQuery(QUERY_USER,{
    notifyOnNetworkStatusChange: true
  });
  //const { loading, error, data } = useQuery(LOGIN,);
  const appStore = useDragItStore();

  useEffect(()=>{
    if(!appStore.loggedUser && !localToken){
      history?.push(LOGIN_URL);
    }
    if(!appStore.loggedUser && localToken){
      excuteQuery( {variables:{token:localToken}})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=>{
    //appStore.setLoading(loading);
    if(data){
      appStore.setLoggedUser(data.userByToken);
    }
    if(error){
      console.log(error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error, data])
}