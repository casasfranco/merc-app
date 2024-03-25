import config from '../../../config';
import contractMutations from '../../../graphql/contract/mutations';
import { mapContractData } from '../../helpers';

import { api } from '../../hooks/useApi/useApi';

const {
  urls: { contract: contractUrl },
} = config;

const { CREATE_CONTRACT } = contractMutations;

const createContract = async (contractData) => {
  try {
    const dataToBackend = mapContractData(contractData.contract);
    console.log(dataToBackend);
    const { data, errors } = await api.secure.post(
      contractUrl.create,
      CREATE_CONTRACT,
      {
        createContractInput: dataToBackend,
      }
    );

    if (errors) {
      return {
        error: `Error al crear un contrato: ${errors[0].message}.`,
      };
    }
    return { data };
  } catch (error) {
    return {
      error: error.message || 'Error desconocido al crear el contrato',
    };
  }
};

export { createContract };
