export var appGQLType = `
  type RxAuth{
    id: ID!
    rxSlug: String
    name: String
    predefined: Boolean
  }

  type RxPage{
    id:ID!
    name:String
    query:String
    "弹出式页面使用，可选：'lg' | 'md' | 'sm' | 'xl' | 'xs' | 'false'"
    max_width:String
    width:Int
    schema:JSON
    auths:[String]
  }

  type RxApp{
    id: ID!
    rx_slug: String
    name: String
    icon: String 
    color: String
    app_type: String
    pages: [RxPage]
    navigation_items: JSON
    auths: [RxAuth]
  }
`

export var appGQLInput =`
  input RxAppInput{
    id: ID
    rx_slug: String
    name: String
    icon: String 
    color: String
    app_type: String
    pages: [RxPage]
    navigation_items: JSON
    auths: [RxAuth]
  }
`

export var appGQLQuery = `
  rxApps:[RxApp]!
  rxApp(id:ID):RxApp
`

export var appGQLMutation = `
  removeRxApp(id:ID):RxApp
  saveRxApp(rxApp:RxAppInput):RxApp
`