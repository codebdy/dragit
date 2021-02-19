import { gql } from "@apollo/react-hooks";

export const QUERY_FOLDERS = gql`
  query {
    rxMediaFoldersTree
  }
`;
export const QUERY_MEDIAS = gql`
  query ($first:Int!, $page:Int, $name:String, $rx_media_folder_id:ID){
    rxMedias(first:$first, page:$page, name:$name, rx_media_folder_id:$rx_media_folder_id, orderBy: [{ column: CREATED_AT, order: ASC }]){
      data{
        id
        thumbnail
        name
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
  mutation ($parent_id:ID, $name:String){
    addRxMediaFolder(parent_id:$parent_id, name:$name){
      id
      name
      parent_id
    }
  }
`;

export const MUTATION_UPDATE_FOLDER = gql`
  mutation ($id:ID, $name:String, $parent_id:ID){
    updateRxMediaFolder(id:$id, name:$name, parent_id:$parent_id){
      id
      name
    }
  }
`;

export const MUTATION_REMOVE_FOLDER = gql`
  mutation ($id:[ID!]!){
    removeRxMediaFolders(id:$id){
      id
      name
    }
  }
`;

export const MUTATION_UPDATE_MEDIA = gql`
  mutation ($rxMedia:RxMediaInput!){
    updateRxMedia(rxMedia:$rxMedia){
      id
      name
    }
  }
`;

export const MUTATION_REMOVE_MEDIAS = gql`
  mutation ($id:[ID!]!){
    removeRxMedias(id:$id){
      id
    }
  }
`;