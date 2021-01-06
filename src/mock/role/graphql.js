export var roleGQLType = `
  type Role{
    id: ID!
    name:String
    status:String
    description:String
    auths:[String]
  }

  type Roles{
    paginatorInfo:PaginatorInfo!
    data:[Role]
  }

`

export var roleGQLInput =`
  input RoleInput{
    id:ID
    name:String
  }
`

export var roleGQLQuery = `
  roles(first: Int!, page: Int, where:JSON, orderBy:JSON):Roles!
  role(id:ID):Role
  allRoles:[Role]
`

export var roleGQLMutation = `
  updateRoles(command:String, ids:[ID] ):[Role]
  saveRole(role:RoleInput):Role
`