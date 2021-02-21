import { gql } from "@apollo/react-hooks";

export const QUERY_FOLDERS = gql`
  query {
    rxMediaFoldersTree
  }
`;

export const MUTATION_ADD_FOLDER = gql`
  mutation ($parent_id:ID, $name:String, $rx_user_id:ID){
    addRxMediaFolder(parent_id:$parent_id, name:$name, rx_user_id:$rx_user_id){
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