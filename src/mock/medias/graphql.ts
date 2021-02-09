export var mediasGQLType = `
  type MediaFolder{
    id: ID!
    name: String
    parent: MediaFolder
  }

  type Media {
    id:ID!
    thumbnail: String
    title: String
    src: String
    alt: String
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
    thumbnail: String
    title: String
    folderId:ID
    alt: String
    src: String
  }
`

export var mediasGQLQuery = `
  rxMediaFoldersTree:String
  rxMedias(first: Int!, page: Int, where:JSON, orderBy:JSON): Medias
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