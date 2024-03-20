const contractMutations = {
  CREATE_CONTRACT: `
  mutation Mutation($createContractInput: CreateContractInput!) {
    createContract(createContractInput: $createContractInput) {
      id
      number
      date
      freeDaysPOD
      price
      invoiceNumber
      payment
      incoterm
      notes
      isActive
    }
  }
  `,
};
export default contractMutations;
