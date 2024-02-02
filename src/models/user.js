import { useAuth } from '../lib/hooks/useAuth';

const user = {
  state: JSON.parse(sessionStorage.getItem('user')),
  reducers: {
    set: (state, user) => (user ? { ...state, ...user } : null),
  },
  effects: (dispatch) => ({
    save: (update, root) => {
      if (update) {
        const { token, ...user } = update;

        user.id = token ? JSON.parse(atob(token.split('.')[1])).sub : null;
        user.hasSession = !!token || !!user.hasSession;
        user.loggingIn = token ? false : !!user.loggingIn;
        user.refreshing = token ? false : !!user.refreshing;

        const userState = {
          ...root.user,
          ...user,
          token,
        };
        dispatch.user.set(userState);

        sessionStorage.setItem(
          'user',
          JSON.stringify({ ...root.user, ...user })
        );
        return userState;
      } else {
        dispatch.user.set(null);
        sessionStorage.removeItem('user');
        return null;
      }
    },
    login: async (credentials, root) => {
      const { login } = useAuth();

      const { user } = credentials;
      const { login: userData } = await login(user);

      const userState = {
        ...root.user,
        ...userData,
      };
      dispatch.user.set(userState);
      sessionStorage.setItem(
        'user',
        JSON.stringify({ ...root.user, ...userData })
      );
      return userState;
      // dispatch.user.save(null);
      // dispatch({ type: 'global/reset' });
    },
    signOut: () => {
      dispatch.user.save(null);
      dispatch({ type: 'global/reset' });
      sessionStorage.clear();
    },
  }),
};

export default user;
