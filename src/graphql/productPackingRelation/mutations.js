const productPackingRelationMutations = {
  CREATE_PRODUCT_PACKING_REL: `
  mutation CreateProductPacking($createProductPackingInput: CreateProductPackingInput!) {
    createProductPacking(createProductPackingInput: $createProductPackingInput) {
      id
      isActive
      lastUpdateBy {
        fullName
      }
    }
  }
  `,
};
export default productPackingRelationMutations;
