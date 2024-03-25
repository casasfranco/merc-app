const userQueries = {
  GET_USER: `
    query Revalidate {
      revalidate {
        token
        user {
          id
          fullName
          email
          roles
        }
      }
    }`,
};
export default userQueries;
