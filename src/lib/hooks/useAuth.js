import { api } from './useApi/useApi';
import config from '../../config';
import { mutations } from '../../graphql/user';
import { useError } from '../hoc/ErrorContext';
import { useEffect } from 'react';

export const useAuth = () => {
  const { handleError } = useError();
  const {
    urls: { user },
  } = config;

  useEffect(() => {}, []);

  const { LOGIN } = mutations;

  const login = async (credentials) => {
    try {
      const response = await api.graphQl.post(user.login, LOGIN, {
        loginInput: { ...credentials },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      // mostrar error aqui
      handleError(`Error en el inicio de sesión: ${error}`);
    }
  };

  return { login };
};
