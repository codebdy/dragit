import { gql } from '@apollo/react-hooks';

// 定义查询语句
//String代替JSON
export const GET_DRAWER = gql`
  query {
    drawer{
      id
      items
    }
  }
`;

export const SAVE_DRAWER = gql`
  mutation ($items:JSON) {
    drawer(items:$items){
      id
      items
    }
  }
`

export const GET_PAGE = gql`
  query($id:ID){
    page(id:$id){
      id
      name
      maxWidth:max_width
      inTabIndex:in_tab_index
      width
      schema
      auths
    }
  }
`

export const SAVE_PAGE = gql`
  mutation($page:PageInput){
    page(page:$page){
      id
      name
      maxWidth:max_width
      inTabIndex:in_tab_index
      width
      schema
      auths
    }
  }
`
