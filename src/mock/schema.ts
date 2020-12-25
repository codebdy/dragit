import { articlesData } from "./data/articlesData";
import drawer from "./drawer"
import { getUser } from "./getUser";
import { login } from "./login/login";
import { getModuleBySlug } from "./modules/getModuleBySlug";
import { getModulePage } from "./modules/getModulePage";
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

  type LoginData{
    user:User! 
    token:String!
  }

  type Page{
    id:ID!
    slug:String!
    name:String 
    "'lg' | 'md' | 'sm' | 'xl' | 'xs' | 'false'"
    max_width:String
    in_tab_index:Boolean
    width:Int
    schema:JSON
    auths:[String]  
  }

  type Module {
    id: ID!
    slug: String
    name: String
    module_type: String
    is_drawer_style: Boolean
    pages: [Page]
    entryPage: Page
  }

  type PaginatorInfo{
    count:Int
    currentPage:Int
    hasMorePages:Boolean
    lastPage:Int
    perPage:Int
    total:Int
  }

  enum PostStatus {
    PUBLISHED
    DRAFT 
  }

  type Post{
    id: ID!
    feathureImage: Media
    slug: String
    title: String
    shortTitle: String
    content: String
    status: PostStatus
    created_at: String!
    updated_at: String 
  }

  type Posts{
    paginatorInfo:PaginatorInfo!
    data:[Post]
  }

  type Query {
    "登录"
    login(login_name:String!, password:String!):LoginData
    userByToken(token: String!): User
    drawerItems:JSON!
    modulePage(moduleSlug:String!, pageSlug:String):Page
    page(id:ID!):Page
    moduleBySlug(slug:String):Module
    posts(first: Int!, page: Int, where:JSON, orderBy:JSON):Posts!
  }

  type Mutation{
    "Query and Operation"
    updatePosts(command:String, ids:[ID] ):[Post]
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

    modulePage:async (parent:any, args:any, context:any, info:any)=>{
      await sleep(1000);
      const page = getModulePage(args.moduleSlug, args.pageSlug);
      return page
    },

    page:async (parent:any, args:any, context:any, info:any)=>{
      await sleep(1000);
      return null
    },

    moduleBySlug:async (parent:any, args:any, context:any, info:any)=>{
      await sleep(1000);
      const module = getModuleBySlug(args.slug);
      return module
    },
    posts:async (parent:any, args:any, context:any, info:any)=>{
      await sleep(500);
      //const module = getModuleBySlug(args.slug);
      return {data:articlesData, paginatorInfo:{currentPage:1, count:8, perPage:10, lastPage:11, total:123}}
    },
  },

  Mutation:{
    updatePosts:async (parent:any, args:any, context:any, info:any)=>{
      await sleep(200);
      //const module = getModuleBySlug(args.slug);
      return articlesData
    },
   
  }
};