const createContract = async (contractData) => {
  const { createContractInput } = getContractInput(contractData);

  // const response = await api.secure.post(productUrl.create, CREATE_PRODUCT, {
  //   createProductInput,
  // });

  // return response.data;
};

const getContractInput = (contractData) => {
  const createContractInput = {
    ...product,
  };
  return createContractInput;
};

// const createProduct = async (product) => {
//   const createProductInput = {
//     ...product,
//   };
//   const response = await api.secure.post(productUrl.create, CREATE_PRODUCT, {
//     createProductInput,
//   });

//   return response.data;
// };

// const createPacking = async (packing) => {
//   const createPackingInput = {
//     ...packing,
//   };
//   const response = await api.secure.post(packingUrl.create, CREATE_PACKING, {
//     createPackingInput,
//   });

//   if (response.errors) {
//     const error = response.errors[0].extensions.response;
//     throw new Error(`${error.error} - ${error.statusCode} - ${error.message}`);
//   }

//   return response.data;
// };

// const createRelationProductPacking = async (formData) => {
//   const createProductPackingInput = {
//     ...formData,
//   };
//   const response = await api.secure.post(
//     productPackingRelationUrl.create,
//     CREATE_PRODUCT_PACKING_REL,
//     {
//       createProductPackingInput,
//     }
//   );

//   if (response.errors) {
//     const error = response.errors[0].extensions.response;
//     throw new Error(`${error.error} - ${error.statusCode} - ${error.message}`);
//   }

//   return response.data;
// };

// // Función para verificar la existencia del producto
// const checkProductExistence = (product, products) => {
//   const { all: allProducts = [] } = products;
//   const exists = allProducts.find((prod) => prod.codeHS === product.codeHS);
//   return exists;
// };

// // Función refactorizada para manejar la creación de productos y empaques
// const handleProductAndPackingCreation = async (data) => {
//   const { product, packingId: withPackingId, packing, quantity } = data;
//   let packingId = null;

//   const { createProduct: productResponse } = await createProduct(product);

//   if (withPackingId != 'new') packingId = withPackingId;

//   if (packing && withPackingId === 'new') {
//     const { createPacking: packingResponse } = await createPacking(packing);
//     packingId = packingResponse.id;
//   }

//   await handleCreateRelationProductPacking({
//     productId: productResponse.id,
//     packingId,
//     quantity,
//   });
// };

// const handleCreateRelationProductPacking = async ({
//   productId,
//   packingId,
//   quantity,
// }) => {
//   await createRelationProductPacking({
//     productId,
//     packingId,
//     quantity: parseFloat(quantity),
//   });
// };

export // createProduct,
// createPacking,
// createRelationProductPacking,
// handleProductAndPackingCreation,
// checkProductExistence,
// handleCreateRelationProductPacking,
 {};
