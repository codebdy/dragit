export var userGQLType = `
  type User {
    id:ID!
    login_name:String!
    name:String
    email: String
    avatar:Media
    is_supper:Boolean
    is_demo:Boolean
    status:String
    roles: [Role]
    auths:[String]
    created_at:String
  }

  type Users{
    paginatorInfo:PaginatorInfo!
    data:[User]
  }

`

export var userGQLInput =`
  input UserInput{
    id:ID
    name:String
  }
`

export var userGQLQuery = `
  users(first: Int!, page: Int, where:JSON, orderBy:JSON):Users!
  user(id:ID):User
  allUsers:[User]
`

export var userGQLMutation = `
  updateUsers(command:String, ids:[ID] ):[User]
  saveUser(user:UserInput):User
`