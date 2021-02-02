import { gql } from '@apollo/react-hooks';
import { pageFieldsGQL } from './PAGE_GQLs';

export const appFieldsGQL = `
  id
  name
  is_system
  icon 
  color
  app_type
  navigation_items
  entry_page_id
  auths{
    id
    rx_slug
    name
    predefined
  }
  notifications
`


export const GET_RX_APP_LIST = gql`
  query {
    rxApps{
      ${appFieldsGQL}
    }
  }
`

export const GET_RX_APP = gql`
  query ($id:ID){
    rxApp(id:$id){
      ${appFieldsGQL}
      pages{
        ${pageFieldsGQL}
      }
    }
  }
`
export const SAVE_RX_APP = gql`
  mutation($rxApp:RxAppInput){
    saveRxApp(rxApp:$rxApp){
      ${appFieldsGQL}
    }
  }
`

export const CREATE_RX_APP = gql`
  mutation($rxApp:RxAppInput){
    createRxApp(rxApp:$rxApp){
      ${appFieldsGQL}
    }
  }
`

export const REMOVE_RX_APP  = gql`
mutation($id:ID){
  removeRxApp(id:$id){
    id
    name
  }
}
`;

export const GET_RX_TEMPLATES = gql`
  query {
    rxTemplates{
      id
      name
      schema
      thumbnail
    }
  }
`


