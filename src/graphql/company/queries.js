const companyQueries = {
  GET_ALL_COMPANIES: `
  query Companies {
    companies {
      id
      name
      taxId
    }
  }`,
};
export default companyQueries;
