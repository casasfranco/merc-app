const userMutations = {
  LOGIN: `
            mutation Login($loginInput: LoginInput!) {
                login(loginInput: $loginInput) {
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
export default userMutations;
