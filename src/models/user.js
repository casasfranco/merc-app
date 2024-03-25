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
      if (error) {
        return { error };
      }
      const { login } = data;
      const userState = {
        ...root.user,
        ...login,
      };
      dispatch.user.set(userState);
      sessionStorage.setItem(
        'token',
        JSON.stringify({
          token: login.token,
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
