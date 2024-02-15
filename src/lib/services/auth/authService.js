import config from '../../../config';
import { userMutations } from '../../../graphql/user';
import { api } from '../../hooks/useApi/useApi';

export const authService = {
  login: async (credentials) => {
    const { LOGIN } = userMutations;
    const { user } = config.urls;

    try {
      const { data, errors } = await api.graphQl.post(user.login, LOGIN, {
        loginInput: { ...credentials },
      });
      if (errors) {
        return {
          error: `Error en el inicio de sesión: ${errors[0].message}.`,
        };
      }
      return { data };
    } catch (error) {
      return {
        error: error.message || 'Error desconocido en el inicio de sesión',
      };
    }
  },
};
