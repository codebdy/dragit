import { userByTokenResolver, loginResolver } from "./login/resolvers";
import { articleGQLType, articleGQLQuery, articleGQLMutation, articleGQLInput } from "./article/graphql";
import { channelTreeResolver } from "./article/channel/resolvers";
import { allPostTagsResolver } from "./article/tag/resolvers";
import { allPostAttributesResolver } from "./article/attribute/resolvers";
import { mediasGQLMutation, mediasGQLQuery, mediasGQLType } from "./medias/graphql";
import { mediaQueryResolvers } from "./medias/queryResolvers";
import { mediaMutationResolvers } from "./medias/mutationResolvers";
import { postMutationResolvers, postQueryResolvers } from "./article/post/resolvers";
import { splitDemoMutationResolvers } from "./demo/splitSubmit/resolvers";
import { splitGQLInput, splitGQLMutation, splitGQLType } from "./demo/splitSubmit/graphql";
import { supplierQueryResolvers } from "./supplier/resolvers";
import { supplierGQLInput, supplierGQLQuery, supplierGQLType } from "./supplier/graphql";
import { userGQLType, userGQLInput, userGQLQuery, userGQLMutation } from "./user/userGraphql";
import { userQueryResolvers, userMutationResolvers } from "./user/resolvers";
import { appGQLInput, appGQLMutation, appGQLQuery, appGQLType } from "./apps/graphql";
import { appMutationResolvers, appQueryResolvers } from "./apps/appResolvers";
import { pageMutationResolvers, pageQueryResolvers } from "./apps/pageResolvers";
import { templateQueryResolvers } from "./templates/resolvers";
import { templateGQLQuery, templateGQLType } from "./templates/graphql";
import { authMutationResolvers } from "./apps/authResolvers";
import { roleGQLType, roleGQLInput, roleGQLQuery, roleGQLMutation } from "./user/roleGraphql";
import { authGQLInput, authGQLMutation, authGQLQuery, authGQLType } from "./user/authGraphql";
const GraphQLJSON = require('graphql-type-json');
// The GraphQL schema
export const schema = `
  scalar JSON

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
    user:RxUser! 
    token:String!
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

  ${authGQLType}
  ${authGQLInput}

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
    userByToken(token: String!): RxUser
    ${authGQLQuery}
    ${appGQLQuery}
    ${templateGQLQuery}
    ${articleGQLQuery}
    ${mediasGQLQuery}
    ${supplierGQLQuery}
    ${roleGQLQuery}
    ${userGQLQuery}
  }

  type Mutation{
    ${authGQLMutation}
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
    ...authMutationResolvers,

    ...postMutationResolvers,
    ...mediaMutationResolvers,
    ...splitDemoMutationResolvers, 
    ...userMutationResolvers
  }
};