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
    saveDrawerItems(items:$items){
      id
      items
    }
  }
`
