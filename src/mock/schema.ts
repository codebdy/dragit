import { sleep } from "./utils/sleep";
import { modulePageResolver } from "./module/modulePageResolver";
import { moduleBySlugResolver } from "./module/moduleBySlugResolver";
import { drawerResolver, saveDrawerItemsResolver } from "./drawer/drawerItemsResolver";
import { userByTokenResolver, loginResolver } from "./login/resolvers";
import { articleGQLType, articleGQLQuery, articleGQLMutation, articleGQLInput } from "./article/graphql";
import { channelTreeResolver } from "./article/channel/resolvers";
import { allPostTagsResolver } from "./article/tag/resolvers";
import { allPostAttributesResolver } from "./article/attribute/resolvers";
import { mediasGQLMutation, mediasGQLQuery, mediasGQLType } from "./medias/graphql";
import { mediaQueryResolvers } from "./medias/queryResolvers";
import { mediaMutationResolvers } from "./medias/mutationResolvers";
import { postMutationResolvers, postQueryResolvers } from "./article/post/resolvers";
import { splitDemoMutationResolvers } from "./demos/splitSubmit/resolvers";
import { splitGQLInput, splitGQLMutation, splitGQLType } from "./demos/splitSubmit/graphql";
import { supplierQueryResolvers } from "./supplier/resolvers";
import { supplierGQLInput, supplierGQLQuery, supplierGQLType } from "./supplier/graphql";
import { pageResolver } from "./module/pageResolver";
const GraphQLJSON = require('graphql-type-json');
// The GraphQL schema
export const schema = `
  scalar JSON
  
  type Drawer{
    id:ID
    items:JSON
  }

  type SeoMeta{
    id:ID!
    title: String
    keywords: String
    description: String 
  }

  input SeoMetaInput{
    id:ID
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
  ${mediasGQLType}
  ${articleGQLType}
  ${articleGQLInput}
  ${splitGQLType}
  ${splitGQLInput}
  ${supplierGQLType}
  ${supplierGQLInput}
  type Query {
    "登录"
    login(login_name:String!, password:String!):LoginData
    userByToken(token: String!): User
    drawer:Drawer
    modulePage(moduleSlug:String!, pageSlug:String):Page
    page(id:ID!):Page
    moduleBySlug(slug:String):Module
    ${articleGQLQuery}
    ${mediasGQLQuery}
    ${supplierGQLQuery}
  }

  type Mutation{
    saveDrawerItems(items:JSON):Drawer
    ${articleGQLMutation}
    ${mediasGQLMutation}
    ${splitGQLMutation}
  }
`;

// A map of functions which return data for the schema.
export const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    userByToken: userByTokenResolver,
    login:loginResolver,
    drawer:drawerResolver,
    modulePage:modulePageResolver,
    page:pageResolver,

    moduleBySlug:moduleBySlugResolver,
    ...postQueryResolvers,
    channelTree:channelTreeResolver,
    allPostTags:allPostTagsResolver,
    allPostAttributes:allPostAttributesResolver,
    
    ...mediaQueryResolvers,
    ...supplierQueryResolvers,
  },

  Mutation:{
    saveDrawerItems:saveDrawerItemsResolver,
    ...postMutationResolvers,
    ...mediaMutationResolvers,
    ...splitDemoMutationResolvers, 
  }
};