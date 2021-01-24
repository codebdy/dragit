import { gql } from '@apollo/react-hooks';

const appFieldsGQL = `
  id
  name
  icon 
  color
  appType: app_type
  navigationItems: navigation_items
  auths{
    id
    rxSlug:rx_slug
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
        id
        name 
        maxWidth:max_width
        width
        schema
        auths
      }
    }
  }
`
export const SAVE_RX_APP = gql`
  mutation($rxApp:RxAppInput){
    rxApp(rxApp:$rxApp){
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

export const GET_PAGE = gql`
  query($id:ID){
    page(id:$id){
      id
      name
      maxWidth:max_width
      inTabIndex:in_tab_index
      width
      schema
      auths
    }
  }
`

export const SAVE_PAGE = gql`
  mutation($page:PageInput){
    page(page:$page){
      id
      name
      maxWidth:max_width
      inTabIndex:in_tab_index
      width
      schema
      auths
    }
  }
`
