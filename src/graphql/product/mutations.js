const productMutations = {
  CREATE_PRODUCT: `
  mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
      codeHS
      description
      isActive
      lastUpdateBy {
        fullName
      }
    }
  }
  `,
};
export default productMutations;
