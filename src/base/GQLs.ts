import { gql } from '@apollo/react-hooks';

// 定义查询语句
//String代替JSON
export const GET_DRAWER_ITEMS = gql`
  query {
    drawerItems
  }
`;
