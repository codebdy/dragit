export var authGQLType = `
  type RxAuth{
    id: ID!
    rx_slug: String!
    name: String
    predefined: Boolean
    group_name:String
  }

  type RxAuths{
    paginatorInfo:PaginatorInfo!
    data:[RxAuth]
  }
`

export var authGQLInput =`
  input RxAuthInput{
    id: ID
    rx_slug: String
    name: String
    predefined: Boolean
    group_name:String
  }
`

export var authGQLQuery = `
  systemRxAuths:RxAuths
  allRxAuths:[RxAuth]
`
export var authGQLMutation = `
  removeRxAuth(id:ID):RxAuth
  saveRxAuth(auth:RxAuthInput):RxAuth
`
