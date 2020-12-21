import drawer from "./drawer"
import { getUser } from "./getUser";
import { login } from "./login/login";
const GraphQLJSON = require('graphql-type-json');
// The GraphQL schema
export const schema = `
  scalar JSON
  
  type Media {
    id:ID!
    thumbnail: String!
    title: String
    src: String
  }

  type User {
    id:ID!
    login_name:String!
    name:String
    avatar:Media
    is_supper:Boolean
    is_demo:Boolean
    auths:[String] 
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

  type LoginData{
    user:User! 
    token:String!
  }

  type Query {
    "查询所有用户列表"
    login(login_name:String!, password:String!):LoginData
    userByToken(token: String!): User
    drawerItems:JSON!
  }
`;

function sleep(ms:number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

// A map of functions which return data for the schema.
export const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    userByToken: async(parent:any, args:any, context:any, info:any) => {
      await sleep(1000);
      return getUser(args.token);
    },

    login:async(parent:any, args:any, context:any, info:any)=>{
      //console.log("Login mock", parent, context, info,  args);
      await sleep(1000);
      const user = login(args.login_name, args.password);
      return {user, token:user.login_name};
    },

    //不能返回树形结构，用String代替
    drawerItems:async ()=>{
      await sleep(1000);
      return drawer
    },
  },
};