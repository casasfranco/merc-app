import { authService } from '../lib/services/auth/authService';

const user = {
  state: JSON.parse(sessionStorage.getItem('user')),
  reducers: {
    set: (state, user) => (user ? { ...state, ...user } : null),
  },
  effects: (dispatch) => ({
    login: async (credentials, root) => {
      const { user } = credentials;
      const { error, data } = await authService.login(user);
      console.log({ data });
      if (error) {
        return { error };
      }
      const userState = {
        ...root.user,
        // ...userData,
      };
      dispatch.user.set(userState);
      sessionStorage.setItem(
        'user',
        JSON.stringify({
          ...root.user,
          //  ...userData
        })
      );
      return userState;
    },
    signOut: () => {
      dispatch.user.save(null);
      dispatch({ type: 'global/reset' });
      sessionStorage.clear();
    },
  }),
};

export default user;
