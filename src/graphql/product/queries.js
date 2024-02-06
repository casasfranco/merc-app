const productQueries = {
  GET_ALL_PRODUCTS: `
    query Products {
      products {
        id
        codeHS
        description
        isActive
      }
    }`,
};
export default productQueries;
