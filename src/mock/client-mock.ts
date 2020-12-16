import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { schema, resolvers } from './schema';

const cache = new InMemoryCache();

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: 'error',
  },
});

export default new ApolloClient({
  link: new SchemaLink({ schema: executableSchema }),
  cache,
});
