import { gql } from "@apollo/react-hooks";

export const QUERY_FOLDERS = gql`
  query {
    rxMediaFoldersTree
  }
`;
export const QUERY_MEDIAS = gql`
  query ($first:Int!, $page:Int, $name:String){
    rxMedias(first:$first, page:$page, name:$name, orderBy: [{ column: CREATED_AT, order: ASC }]){
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

export const MUTATION_UPDATE_FOLDER = gql`
  mutation ($folder:MediaFolderInput){
    updateMediaFolder(folder:$folder){
      id
      name
    }
  }
`;

export const MUTATION_REMOVE_FOLDER = gql`
  mutation ($id:ID!){
    removeMediaFolder(id:$id){
      id
      name
    }
  }
`;

export const MUTATION_UPDATE_MEDIA = gql`
  mutation ($media:MediaInput!){
    updateMedia(media:$media){
      id
    }
  }
`;

export const MUTATION_REMOVE_MEDIAS = gql`
  mutation ($ids:[ID]){
    removeMedias(ids:$ids){
      ids
    }
  }
`;