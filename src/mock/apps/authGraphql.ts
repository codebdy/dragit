export var authGQLType = `
  type RxAuth{
    id: ID!
    rx_slug: String!
    name: String
    predefined: Boolean
    group_name:String
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
  systemRxAuths:[RxAuth]
  allRxAuths:[RxAuth]
`
export var authGQLMutation = `
  removeRxAuth(id:ID):RxAuth
  saveRxAuth(auth:RxAuthInput):RxAuth
`
