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
    signOut: () => {
      dispatch.user.save(null);
      dispatch({ type: 'global/reset' });
    },
  }),
};

export default user;
