const packingQueries = {
  GET_ALL_PACKINGS: `
    query Packings {
      packings {
        id
        description
        unit
        isActive
      }
    }`,
};
export default packingQueries;
