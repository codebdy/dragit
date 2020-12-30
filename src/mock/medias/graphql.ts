export var mediasGQLType = `
  type MediaFolder{
    id: ID!
    name: String
    parent: MediaFolder
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

  input MediaFolderInput {
    id: ID!
    name: String,
    parentId: ID,
  }

  input MediaInput {
    id:ID!
    title: String
    folderId:ID
    alt: String
  }
`

export var mediasGQLQuery = `
  mediaFoldersTree:JSON
  medias(first: Int!, page: Int, where:JSON, orderBy:JSON): Medias
`

export var mediasGQLMutation = `
  addMediaFolder(parentId: ID):MediaFolder
  removeMediaFolder(id: ID):MediaFolder
  updateMediaFolder(folder:MediaFolderInput):MediaFolder
  removeMedias(ids:[ID]):[Media]
  updateMedia(media:MediaInput):Media
`

//moveFolder(id:ID!, targetFolderId:ID!):MediaFolder
//moveMedia(id:ID!, targetFolderId:ID!):Media