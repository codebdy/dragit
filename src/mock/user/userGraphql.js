export var userGQLType = `
  type RxUser {
    id:ID!
    login_name:String!
    name:String
    email: String
    avatar:Media
    is_supper:Boolean
    is_demo:Boolean
    status:String
    roles: [RxRole]
    auths:[String]
    created_at:String
  }

  type RxUsers{
    paginatorInfo:PaginatorInfo!
    data:[RxUser]
  }

`

export var userGQLInput =`
  input RxUserInput{
    id:ID
    login_name:String
    password:String
    name:String
    email: String
    avatar: ID
    is_supper:Boolean
    is_demo:Boolean
    status:String
    roles: [ID]
    auths:[ID]
    created_at:String
  }
`

export var userGQLQuery = `
  rxUsers(first: Int!, page: Int, where:JSON, orderBy:JSON):RxUsers!
  rxUser(id:ID):RxUser
  allRxUsers:[RxUser]
`

export var userGQLMutation = `
  updateRxUsers(command:String, ids:[ID] ):[RxUser]
  saveRxUser(user:RxUserInput):RxUser
`