import config from '../../../config';
import { productMutations } from '../../../graphql/product';
import { api } from '../../hooks/useApi/useApi';

const {
  urls: { product: productUrl },
} = config;

const { CREATE } = productMutations;

const createProduct = async (formData) => {
  const { packing, ...product } = formData;
  console.log({ packing });
  const createProductInput = {
    ...product,
  };
  const response = await api.secure.post(productUrl.create, CREATE, {
    createProductInput,
  });

  if (response.errors) {
    const error = response.errors[0].extensions.response;
    throw new Error(`${error.error} - ${error.statusCode} - ${error.message}`);
  }

  return response.data;
};

// const createPacking = (formData) => {};

export { createProduct };
