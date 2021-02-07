import { gql } from '@apollo/react-hooks';
import { pageFieldsGQL } from './PAGE_GQLs';

export const authsFieldGQL = `
  id
  rx_slug
  name
  predefined
`

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
    ${authsFieldGQL}
  }
  notifications
`


export const GET_RX_APP_LIST = gql`
  query {
    rxApps{
      ${appFieldsGQL}
      pages{
        id
      }
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
export const Update_RX_APP = gql`
  mutation($rxApp:UpdateRxAppInput){
    updateRxApp(rxApp:$rxApp){
      ${appFieldsGQL}
    }
  }
`

export const CREATE_RX_APP = gql`
  mutation($rxApp:CreateRxAppInput){
    createRxApp(rxApp:$rxApp){
      ${appFieldsGQL}
    }
  }
`

export const REMOVE_RX_APP  = gql`
  mutation($id:ID!, $authIds:[ID!]!, $pageIds:[ID!]!){
    removeRxAuth(id:$authIds){
      name
    }
    removeRxPage(id:$pageIds){
      name
    }
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


