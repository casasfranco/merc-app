const productMutations = {
  CREATE: `
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
