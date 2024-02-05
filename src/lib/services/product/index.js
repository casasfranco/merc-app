import config from '../../../config';
import { productMutations } from '../../../graphql/product';
import { packingMutations } from '../../../graphql/packing';
import { productPackingRelationMutations } from '../../../graphql/productPackingRelation';
import { api } from '../../hooks/useApi/useApi';

const {
  urls: {
    product: productUrl,
    packing: packingUrl,
    productPackingRelation: productPackingRelationUrl,
  },
} = config;

const { CREATE_PRODUCT } = productMutations;
const { CREATE_PACKING } = packingMutations;
const { CREATE_PRODUCT_PACKING_REL } = productPackingRelationMutations;

const createProduct = async (product) => {
  try {
    const createProductInput = {
      ...product,
    };
    const response = await api.secure.post(productUrl.create, CREATE_PRODUCT, {
      createProductInput,
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const createPacking = async (packing) => {
  const createPackingInput = {
    ...packing,
  };
  const response = await api.secure.post(packingUrl.create, CREATE_PACKING, {
    createPackingInput,
  });

  if (response.errors) {
    const error = response.errors[0].extensions.response;
    throw new Error(`${error.error} - ${error.statusCode} - ${error.message}`);
  }

  return response.data;
};

const createRelationProductPacking = async (formData) => {
  const createProductPackingInput = {
    ...formData,
  };
  const response = await api.secure.post(
    productPackingRelationUrl.create,
    CREATE_PRODUCT_PACKING_REL,
    {
      createProductPackingInput,
    }
  );

  if (response.errors) {
    const error = response.errors[0].extensions.response;
    throw new Error(`${error.error} - ${error.statusCode} - ${error.message}`);
  }

  return response.data;
};

export { createProduct, createPacking, createRelationProductPacking };
