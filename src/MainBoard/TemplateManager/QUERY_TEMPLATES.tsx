import { gql } from '@apollo/react-hooks';


export const QUERY_TEMPLATES = gql`
  query {
    rxTemplates{
      id
      name
      schema
      media{
        id
        name
        thumbnail
        src
      }
    }
}
`;
