const contractQueries = {
  GET_ALL_CONTRACTS: `
    query Packings {
      packings {
        id
        description
        unit
        isActive
      }
    }`,
};
export default contractQueries;
