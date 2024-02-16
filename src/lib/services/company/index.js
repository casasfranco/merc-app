import config from '../../../config';
import { companyQueries } from '../../../graphql/company';

import { api } from '../../hooks/useApi/useApi';

const {
  urls: { company: companyUrl },
} = config;

const { GET_ALL_COMPANIES } = companyQueries;

const getAllCompanies = async () => {
  try {
    const { data, errors } = await api.secure.post(
      companyUrl.getAll,
      GET_ALL_COMPANIES
    );

    if (errors) {
      return {
        error: `Error al obtener las compañias: ${errors[0].message}.`,
      };
    }
    return { data };
  } catch (error) {
    return {
      error:
        error.message || 'Error desconocido al intentar obtener las compañias',
    };
  }
};
export { getAllCompanies };
