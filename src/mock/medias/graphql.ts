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
`

export var mediasGQLQuery = `
  mediaFoldersTree:JSON
`

export var mediasGQLMutation = `
`