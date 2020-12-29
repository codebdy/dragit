export var mediasGQLType = `
  type MediaFolder{
    id: ID!
    name: String
  }

  type Media {
    id:ID!
    thumbnail: String!
    title: String
    src: String
  }

  type Medias{
    paginatorInfo:PaginatorInfo!
    data:[Media]
  }
`

export var mediasGQLQuery = `
  mediaFoldersTree:JSON
  medias(first: Int!, page: Int, where:JSON, orderBy:JSON): Medias
`

export var mediasGQLMutation = `
`