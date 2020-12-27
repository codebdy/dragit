import { postsResolver } from "./resolvers/post/postsResolver";
import { sleep } from "./resolvers/sleep";
import { postResolver } from "./resolvers/post/postResolver";
import { updatePostsResolver } from "./resolvers/post/updatePostsResolver";
import { drawerItemsResolver } from "./resolvers/drawer/drawerItemsResolver";
import { userByTokenResolver } from "./resolvers/login/userByTokenResolver";
import { loginResolver } from "./resolvers/login/loginResolver";
import { modulePageResolver } from "./resolvers/module/modulePageResolver";
import { moduleBySlugResolver } from "./resolvers/module/moduleBySlugResolver";
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
    post(id:ID):Post
  }

  type Mutation{
    "Query and Operation"
    updatePosts(command:String, ids:[ID] ):[Post]
  }
`;

// A map of functions which return data for the schema.
export const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    userByToken: userByTokenResolver,
    login:loginResolver,
    //不能返回树形结构，用String代替
    drawerItems:drawerItemsResolver,
    modulePage:modulePageResolver,

    page:async (parent:any, args:any, context:any, info:any)=>{
      await sleep(1000);
      return null
    },

    moduleBySlug:moduleBySlugResolver,
    posts:postsResolver,
    post:postResolver,
  },

  Mutation:{
    updatePosts:updatePostsResolver,   
  }
};