export var postAttributeGQLType = `
  type PostAttribute{
    id:ID!
    name:String
    created_at:String
  }

  type PostAttributes{
    paginatorInfo:PaginatorInfo!
    data:[PostAttribute]
  }

  input PostAttributeInput{
    id: ID
    name: String
  }

`
export var postAttributeGQLQuery = `
  allPostAttributes:[PostAttribute]
  postAttributes(first: Int!, page: Int, where:JSON, orderBy:JSON):PostAttributes
  postAttribute(id:ID):PostAttribute
`

export var postAttributeGQLMutation = `
  removePostAttributes(ids:[ID]):[PostAttribute]
  updatePostAttributes(postAttribute:PostAttributeInput, ids:[ID] ):[PostAttribute]
  savePostAttribute(postAttribute:PostAttributeInput):PostAttribute
`