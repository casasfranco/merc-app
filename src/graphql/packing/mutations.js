const packingMutations = {
  CREATE_PACKING: `
  mutation CreatePacking($createPackingInput: CreatePackingInput!) {
    createPacking(createPackingInput: $createPackingInput) {
      id
      description
      unit
      isActive
    }
  }
  `,
};
export default packingMutations;
