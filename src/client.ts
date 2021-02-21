import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';
import { setContext } from '@apollo/client/link/context';
import {createUploadLink} from "apollo-upload-client";

const cache = new InMemoryCache(
  {
    typePolicies: {
      Query: {
        fields: {
          rxApps: {
            merge(existing = [], incoming: any) {
              return incoming;
            }
          },
          rxTemplates: {
            merge(existing = [], incoming: any) {
              return incoming;
            }
          },
        }
      }
    }
  }
);

const httpLink = createUploadLink({
  uri: 'http://127.0.0.1:8000/graphql',
  credentials: 'include'
});



export function creatLink(token?:string|null){
  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  })
  return authLink.concat(httpLink);
}

export default new ApolloClient({
  link:creatLink(),
  //link: new SchemaLink({ schema: executableSchema }),
  cache,
});

