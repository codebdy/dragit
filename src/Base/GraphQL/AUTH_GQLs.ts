import { gql } from '@apollo/react-hooks';

const authFields = `
  id
  rxSlug:rx_slug
  name
  predefined
`

export const SAVE_RX_AUTH = gql`
  mutation($rxAuth:{
    ${authFields}
  }){
    saveRxAuth(rxAuth:$rxAuth){
      ${authFields}
    }
  }
`;


export const CREATE_RX_AUTH = gql`
  mutation($appId:ID, $rxSlug:String, $name:String){
    createRxAuth(appId:$appId, rx_slug:$rxSlug, name:$name){
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

