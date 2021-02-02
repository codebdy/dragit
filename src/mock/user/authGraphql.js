export var authGQLType = `
  type RxAuth{
    id: ID!
    rx_slug: String!
    name: String
    predefined: Boolean
  }
`

export var authGQLInput =`
  input RxAuthInput{
    id: ID
    rx_slug: String
    name: String
    predefined: Boolean
  }
`

export var authGQLQuery = `
  systemRxAuths:[RxAuth]
  rxAuth(id:ID):RxAuth
`

export var authGQLMutation = `
  removeRxAuth(id:ID):RxAuth
  saveRxAuth(auth:RxAuthInput):RxAuth
`