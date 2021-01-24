import { modulePageResolver } from "./module/modulePageResolver";
import { moduleBySlugResolver } from "./module/moduleBySlugResolver";
import { drawerResolver, saveDrawerResolver } from "./drawer/drawerItemsResolver";
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
import { pageResolver, savePageResolver } from "./module/pageResolver";
import { userGQLType, userGQLInput, userGQLQuery, userGQLMutation } from "./user/graphql";
import { userQueryResolvers, userMutationResolvers } from "./user/resolvers";
import { roleGQLType, roleGQLInput, roleGQLQuery, roleGQLMutation } from "./role/graphql";
import { appGQLInput, appGQLMutation, appGQLQuery, appGQLType } from "./apps/graphql";
import { appMutationResolvers, appQueryResolvers } from "./apps/appResolvers";
import { pageMutationResolvers, pageQueryResolvers } from "./apps/pageResolvers";
import { templateQueryResolvers } from "./templates/resolvers";
import { templateGQLQuery, templateGQLType } from "./templates/graphql";
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

  input PageInput{
    id:ID
    name:String 
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

  ${appGQLType}
  ${appGQLInput}
  ${templateGQLType}

  ${mediasGQLType}
  ${articleGQLType}
  ${articleGQLInput}
  ${splitGQLType}
  ${splitGQLInput}
  ${supplierGQLType}
  ${supplierGQLInput}
  ${roleGQLType}
  ${roleGQLInput}
  ${userGQLType}
  ${userGQLInput}
  type Query {
    "登录"
    login(login_name:String!, password:String!):LoginData
    userByToken(token: String!): User
    drawer:Drawer
    modulePage(moduleSlug:String!, pageSlug:String):Page
    page(id:ID!):Page
    moduleBySlug(slug:String):Module
    ${appGQLQuery}
    ${templateGQLQuery}
    ${articleGQLQuery}
    ${mediasGQLQuery}
    ${supplierGQLQuery}
    ${roleGQLQuery}
    ${userGQLQuery}
  }

  type Mutation{
    drawer(items:JSON):Drawer
    page(page:PageInput):Page
    ${appGQLMutation}
    ${articleGQLMutation}
    ${mediasGQLMutation}
    ${splitGQLMutation}
    ${roleGQLMutation}
    ${userGQLMutation}
  }
`;

// A map of functions which return data for the schema.
export const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    userByToken: userByTokenResolver,
    login:loginResolver,

    ...appQueryResolvers,
    ...pageQueryResolvers,
    ...templateQueryResolvers,
    
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
    ...userQueryResolvers,
  },

  Mutation:{
    ...appMutationResolvers,
    ...pageMutationResolvers,
    drawer:saveDrawerResolver,
    page:savePageResolver,
    ...postMutationResolvers,
    ...mediaMutationResolvers,
    ...splitDemoMutationResolvers, 
    ...userMutationResolvers
  }
};