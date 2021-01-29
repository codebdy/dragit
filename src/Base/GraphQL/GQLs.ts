import { gql } from '@apollo/react-hooks';

const appFieldsGQL = `
  id
  name
  is_system
  icon 
  color
  app_type
  navigation_items
  auths{
    id
    rx_slug
    name
    predefined
  }
  notifications
`

export const pageFieldsGQL = `
  id
  name
  maxWidth:max_width
  width
  schema
  auths
  query
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
        id
        name 
        max_width
        width
        schema
        auths
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

// 定义查询语句
//String代替JSON
export const GET_DRAWER = gql`
  query {
    drawer{
      id
      items
    }
  }
`;

export const SAVE_DRAWER = gql`
  mutation ($items:JSON) {
    drawer(items:$items){
      id
      items
    }
  }
`

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


