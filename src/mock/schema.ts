import { sleep } from "./utils/sleep";
import { modulePageResolver } from "./module/modulePageResolver";
import { moduleBySlugResolver } from "./module/moduleBySlugResolver";
import { drawerItemsResolver } from "./drawer/drawerItemsResolver";
import { userByTokenResolver, loginResolver } from "./login/resolvers";
import { postsResolver, postResolver, updatePostsResolver } from "./article/post/resolvers";
import { articleGQLType, articleGQLQuery, articleGQLMutation } from "./article/graphql";
import { channelTreeResolver } from "./article/channel/resolvers";
import { allPostTagsResolver } from "./article/tag/resolvers";
import { allPostAttributesResolver } from "./article/attribute/resolvers";
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

  type SeoMeta{
    id:ID!
    title: String
    keywords: String
    description: String 
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

  ${articleGQLType}

  type Query {
    "登录"
    login(login_name:String!, password:String!):LoginData
    userByToken(token: String!): User
    drawerItems:JSON!
    modulePage(moduleSlug:String!, pageSlug:String):Page
    page(id:ID!):Page
    moduleBySlug(slug:String):Module
    ${articleGQLQuery}
  }

  type Mutation{
    ${articleGQLMutation}
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
    channelTree:channelTreeResolver,
    allPostTags:allPostTagsResolver,
    allPostAttributes:allPostAttributesResolver,
  },

  Mutation:{
    updatePosts:updatePostsResolver,   
  }
};