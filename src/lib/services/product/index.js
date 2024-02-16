import config from '../../../config';
import { productMutations, productQueries } from '../../../graphql/product';
import { packingMutations, packingQueries } from '../../../graphql/packing';
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
const { GET_ALL_PRODUCTS } = productQueries;

const { CREATE_PACKING } = packingMutations;
const { GET_ALL_PACKINGS } = packingQueries;

const { CREATE_PRODUCT_PACKING_REL } = productPackingRelationMutations;

const getAllPackings = async () => {
  try {
    const { data, errors } = await api.secure.post(
      packingUrl.getAll,
      GET_ALL_PACKINGS
    );
    if (errors) {
      return {
        error: `Error al obtener los packings: ${errors[0].message}.`,
      };
    }
    return { data };
  } catch (error) {
    return {
      error:
        error.message || 'Error desconocido al intentar obtener los packings',
    };
  }
};
const getAllProducts = async () => {
  try {
    const { data, errors } = await api.secure.post(
      productUrl.getAll,
      GET_ALL_PRODUCTS
    );
    if (errors) {
      return {
        error: `Error al obtener los packings: ${errors[0].message}.`,
      };
    }
    return { data };
  } catch (error) {
    return {
      error:
        error.message || 'Error desconocido al intentar obtener los packings',
    };
  }
};

const createProduct = async (product) => {
  const createProductInput = {
    ...product,
  };
  const response = await api.secure.post(productUrl.create, CREATE_PRODUCT, {
    createProductInput,
  });

  return response.data;
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

// Función para verificar la existencia del producto
const checkProductExistence = (product, products) => {
  const { all: allProducts = [] } = products;
  const exists = allProducts.find((prod) => prod.codeHS === product.codeHS);
  return exists;
};

// Función refactorizada para manejar la creación de productos y empaques
const handleProductAndPackingCreation = async (data) => {
  const { product, packingId: withPackingId, packing, quantity } = data;
  let packingId = null;

  const { createProduct: productResponse } = await createProduct(product);

  if (withPackingId != 'new') packingId = withPackingId;

  if (packing && withPackingId === 'new') {
    const { createPacking: packingResponse } = await createPacking(packing);
    packingId = packingResponse.id;
  }

  await handleCreateRelationProductPacking({
    productId: productResponse.id,
    packingId,
    quantity,
  });
};

const handleCreateRelationProductPacking = async ({
  productId,
  packingId,
  quantity,
}) => {
  await createRelationProductPacking({
    productId,
    packingId,
    quantity: parseFloat(quantity),
  });
};

export {
  getAllPackings,
  getAllProducts,
  createProduct,
  createPacking,
  createRelationProductPacking,
  handleProductAndPackingCreation,
  checkProductExistence,
  handleCreateRelationProductPacking,
};
