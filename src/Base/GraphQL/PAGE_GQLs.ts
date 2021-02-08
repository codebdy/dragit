import { gql } from '@apollo/react-hooks';

export const pageFieldsGQL = `
  id
  name
  max_width
  width
  schema
  auths{
    id
  }
  query
  excute_query_by_mutation
`

export const SAVE_RX_PAGE = gql`
  mutation($rxPage:UpdateRxPageInput){
    updateRxPage(rxPage:$rxPage){
      ${pageFieldsGQL}
    }
  }
`;


export const CREATE_RX_PAGE = gql`
  mutation($rx_app_id:ID, $name:String, $schema:String){
    createRxPage(rx_app_id:$rx_app_id, rx_page_id:$rx_page_id, name:$name, schema:$schema){
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
