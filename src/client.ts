import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';
import { createHttpLink } from '@apollo/react-hooks';


const cache = new InMemoryCache(
  {
    typePolicies: {
      Query: {
        fields: {
          rxApps: {
            merge(existing = [], incoming: any) {
              return incoming;
            }
          }
        }
      }
    }
  }
);

const link = createHttpLink({
  uri: 'http://127.0.0.1:8000/graphql',
  credentials: 'include'
});

export default new ApolloClient({
  link,
  //link: new SchemaLink({ schema: executableSchema }),
  cache,
});
