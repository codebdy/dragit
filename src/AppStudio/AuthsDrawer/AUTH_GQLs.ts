import { gql } from '@apollo/react-hooks';

export const authFields = `
  id
  rxSlug:rx_slug
  name
  predefined
`

export const SAVE_RX_AUTH = gql`
  mutation($rxAuth:RxAuthInput){
    saveRxAuth(rxAuth:$rxAuth){
      ${authFields}
    }
  }
`;


export const CREATE_RX_AUTH = gql`
  mutation($appId:ID!){
    createRxAuth(appId:$appId){
      ${authFields}
    }
  }
`;

export const REMOVE_RX_AUTH = gql`
  mutation($id:ID){
    removeRxAuth(id:$id){
      id
      name
    }
  }
`;

