import { gql } from '@apollo/react-hooks';

export const pageFieldsGQL = `
  id
  name
  max_width
  width
  schema
  auths
  query
  excute_query_by_mutation
`

export const SAVE_RX_PAGE = gql`
  mutation($rxPage:RxPageInput){
    saveRxPage(rxPage:$rxPage){
      ${pageFieldsGQL}
    }
  }
`;


export const CREATE_RX_PAGE = gql`
  mutation($appId:ID, $templateId:ID, $pageId:ID, $name:String){
    createRxPage(appId:$appId, templateId:$templateId, pageId:$pageId, name:$name){
      ${pageFieldsGQL}
    }
  }
`;

export const REMOVE_RX_PAGE = gql`
  mutation($id:ID){
    removeRxPage(id:$id){
      id
      name
    }
  }
`;

export const DUPLICATE_RX_PAGE = gql`
  mutation($id:ID){
    duplicateRxPage(id:$id){
      ${pageFieldsGQL}
    }
  }
`;
