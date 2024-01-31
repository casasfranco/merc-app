import { api } from './useApi/useApi';
import config from '../../config';
import { mutations } from '../../graphql/user';
import useModel from './useModel';

export const useAuth = () => {
  const { signOut } = useModel.user.dispatch();
  const {
    urls: { user },
  } = config;

  const { LOGIN } = mutations;

  const login = async (credentials) => {
    try {
      const response = await api.graphQl.post(user.login, LOGIN, {
        loginInput: { ...credentials },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  const logout = () => {
    signOut();
  };

  return { login, logout };
};
