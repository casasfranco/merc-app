import axios from 'axios';

import config from '../../../config';
import store from '../../store';

const getHeaders = (options = {}, secure = false) => {
  const headers = { ...options.headers };

  headers['Content-Type'] = 'application/json';

  if (secure) {
    const token = store.getState().user?.token;
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

const api = {
  get: (path, options = {}) =>
    axios.get(config.api.baseUrl + path, {
      ...options,
      headers: getHeaders(options),
    }),
  post: (path, body, options = {}) =>
    axios.post(config.api.baseUrl + path, body, {
      ...options,
      headers: getHeaders(options),
    }),
  put: (path, body, options = {}) =>
    axios.put(config.api.baseUrl + path, body, {
      ...options,
      headers: getHeaders(options),
    }),
  patch: (path, body, options = {}) =>
    axios.patch(config.api.baseUrl + path, body, {
      ...options,
      headers: getHeaders(options),
    }),
  delete: (path, options = {}) =>
    axios.delete(config.api.baseUrl + path, {
      ...options,
      headers: getHeaders(options),
    }),
};

api.graphQl = {
  post: async (path, query, variables = {}, options = {}) => {
    const { data } = await axios.post(
      config.api.baseUrl + path,
      {
        query,
        variables,
      },
      {
        ...options,
        headers: getHeaders(options),
      }
    );

    return data;
  },
};

api.secure = {
  post: async (path, query, variables = {}, options = {}) => {
    const { data } = await axios.post(
      config.api.baseUrl + path,
      {
        query,
        variables,
      },
      {
        ...options,
        headers: getHeaders(options, true),
      }
    );

    return data;
  },
};

api.fakeLoad = (data) =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ data }), 1000);
  });

export { api };

const useApi = () => api;

export default useApi;
