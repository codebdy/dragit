export var postTagGQLType = `
  type PostTag{
    id:ID!
    name:String
    created_at:String
  }

  type PostTags{
    paginatorInfo:PaginatorInfo!
    data:[PostTag]
  }

  input PostTagInput{
    id: ID
    name: String
  }

`
export var postTagGQLQuery = `
  allPostTags:[PostTag]
  postTags(first: Int!, page: Int, where:JSON, orderBy:JSON):PostTags
  postTag(id:ID):PostTag
`

export var postTagGQLMutation = `
  removePostTags(ids:[ID]):[PostTag]
  updatePostTags(postTag:PostTagInput, ids:[ID] ):[PostTag]
  savePostTag(postTag:PostTagInput):PostTag
`