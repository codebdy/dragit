import { gql } from "@apollo/react-hooks";

export const QUERY_FOLDERS = gql`
  query {
    mediaFoldersTree
  }
`;
export const QUERY_MEDIAS = gql`
  query ($first:Int, $page:Int, $where: JSON, $orderBy: JSON){
    medias(first:$first, page:$page, where:$where, orderBy:$orderBy){
      data{
        id
        thumbnail
        title
        src
      }
      paginatorInfo{
        currentPage
        hasMorePages
      }      
    }
  }
`;
export const MUTATION_ADD_FOLDER = gql`
  mutation ($parentId:ID){
    addMediaFolder(parentId:$parentId){
      id
      name
      parent{
        id
      }
    }
  }
`;
