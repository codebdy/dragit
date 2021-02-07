
export const QUERY_ME = `
  query {
    me{
      id
      login_name
      name
      is_demo
      is_supper
      avatar{
        id
        thumbnail
      }
      auths {
        id
      }
    }
  }
`;