import { api } from './useApi/useApi';
import config from '../../config';
import { mutations } from '../../graphql/user';

export const useAuth = () => {
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

  return { login };
};
