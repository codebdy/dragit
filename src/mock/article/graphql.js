export var articleGQLType = `
  type PostAttribute{
    id: ID!
    name: String
  }

  type PostTag{
    id:ID!
    name:String
  }
  type PostChannel{
    id:ID!
    name:String
  }

  type Post{
    id: ID!
    feathureImage: Media
    slug: String
    title: String
    auther: String
    channel: [PostChannel]
    tags:[String]
    email: String
    shortTitle: String
    seoMeta:SeoMeta
    content: String
    order: String
    attributes:[PostAttribute]
    status: PostStatus
    medias:[Media]
    created_at: String!
    updated_at: String 
  }

  type Posts{
    paginatorInfo:PaginatorInfo!
    data:[Post]
  }
`

export var articleGQLInput =`
  input PostChannelInput{
    id:ID
    name:String
  }

  input PostAttributeInput{
    id: ID
    name: String
  }

  input PostInput{
    id: ID
    slug: String
    title: String
    auther: String
    channel: [PostChannelInput]
    tags:[String]
    email: String
    shortTitle: String
    seoMeta:SeoMetaInput
    content: String
    order: String
    attributes:[PostAttributeInput]
    status: String
    medias:[MediaInput]
  }
`

export var articleGQLQuery = `
  posts(first: Int!, page: Int, where:JSON, orderBy:JSON):Posts!
  post(id:ID):Post
  channelTree:JSON
  allPostTags:[PostTag]
  allPostAttributes:[PostAttribute]
`

export var articleGQLMutation = `
  updatePosts(command:String, ids:[ID] ):[Post]
  updatePost(post:PostInput):Post
`