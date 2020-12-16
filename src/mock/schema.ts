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

  type Query {
    "查询所有用户列表"
    users: [User!]!
    "根据 name 查询对应的用户信息"
    user(name: String!): User
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
  },
};