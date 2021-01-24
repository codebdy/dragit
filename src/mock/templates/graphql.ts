export var templateGQLType = `
  type RXTemplate{
    id: ID!
    name: String
    schema: JSON
    thumbnail: String
  }
`

export var templateGQLQuery = `
  rxTemplates:[RXTemplate]!
`