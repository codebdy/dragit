import drawer from "./drawer"
// The GraphQL schema
export const schema = `
  enum Gender {
    MALE
    FEMALE
    NONE
  }

  type User {
    name: String!
    gender: Gender!
    tags: [String!]!
  }

  type MenuBadge {
    color: String
    field: String
    size: String
  }
  
  type MenuChip {
    color: String
    label: String
    size: String
  }
  
  type MenuItem{
    type: String!
    title: String
    icon: String
    badge: MenuBadge
    chip: MenuChip
    children: [MenuItem]
    to: String
    auths:[String]
  }

  type Query {
    "查询所有用户列表"
    users: [User!]!
    "根据 name 查询对应的用户信息"
    user(name: String!): User,
    drawerItems:[MenuItem]!
  }
`;

// A map of functions which return data for the schema.
export const resolvers = {
  Query: {
    users: () => [{ name: 'Jack', gender: 'MALE', tags: [ 'Alibaba' ] }, { name: 'Joe', gender: 'MALE', tags: [] }],
    user: (parent:any, args:any, context:any, info:any) => {
      const { name } = args;
      // find user by name...
      return { name, gender: 'MALE', tags: [ name ] };
    },

    drawerItems:()=>drawer,
  },
};