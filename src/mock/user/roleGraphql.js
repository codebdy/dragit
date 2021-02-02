export var roleGQLType = `
  type RxRole{
    id: ID!
    name:String
    status:String
    description:String
    auths:[RxAuth]
  }

  type RxRoles{
    paginatorInfo:PaginatorInfo!
    data:[RxRole]
  }

`

export var roleGQLInput =`
  input RxRoleInput{
    id:ID
    name:String
  }
`

export var roleGQLQuery = `
  rxRoles(first: Int!, page: Int, where:JSON, orderBy:JSON):RxRoles!
  rxRole(id:ID):RxRole
  allRxRoles:[RxRole]
`

export var roleGQLMutation = `
  updateRxRoles(command:String, ids:[ID] ):[RxRole]
  saveRxRole(role:RxRoleInput):RxRole
`