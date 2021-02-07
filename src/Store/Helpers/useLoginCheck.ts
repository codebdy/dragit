import { useEffect } from "react";
import { useHistory } from "react-router";
import { useDragItStore } from "./useDragItStore";
import { gql, useLazyQuery } from "@apollo/react-hooks";
import { TOKEN_NAME, LOGIN_URL } from "Utils/consts";
import { useShowAppoloError } from "./useInfoError";

// 定义查询语句
const QUERY_USER = gql`
  query {
    me{
      id
      login_name
      name
      is_demo
      is_supper
      avatar{
        id
        thumbnail
      }
      auths {
        id
      }
    }
  }
`;

export function useLoginCheck() {
  const localToken = localStorage.getItem(TOKEN_NAME);
  const history = useHistory();
  const [excuteQuery, { error }] = useLazyQuery(QUERY_USER,{
    notifyOnNetworkStatusChange: true,
    onCompleted(data){
      if(data){
        appStore.setLoggedUser(data.me);
      }
    }
  });
  //const { loading, error, data } = useQuery(LOGIN,);
  const appStore = useDragItStore();

  useShowAppoloError(error);

  useEffect(()=>{
    if(!appStore.loggedUser && !localToken){
      history?.push(LOGIN_URL);
    }
    if(!appStore.loggedUser && localToken){
      excuteQuery()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

}