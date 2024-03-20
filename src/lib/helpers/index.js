export const getContainerFormatted = (data, transformedProducts) => {
  let formattedText = '';
  const product = transformedProducts.find(
    (prod) => prod.value === data.product
  );
  if (product) {
    formattedText = product.label;
  }
  formattedText += `, cosecha: ${data.harvest}`;
  formattedText += `, container: ${data.containerType}`;
  return formattedText;
};

export const mapContractData = (contractData) => {
  const mappedData = {
    incoterm: contractData.incoterm,
    quantity: parseFloat(contractData.quantity),
    price: parseFloat(contractData.price),
    date: contractData.date,
    freeDaysPOD: parseInt(contractData.freeDaysPOD),
    notes: contractData.notes,
    payment: contractData.payment,
    companyBuyerId: contractData.companyBuyer,
    companySellerId: contractData.companySeller,
  };

  mappedData.containers = contractData.containers?.map((container) => ({
    id: container.id,
    product: container.product,
    harvest: parseInt(container.harvest),
    containerType: container.containerType,
    fcl: container.fcl,
  }));

  mappedData.shipmentBatch = contractData.shipmentBatch?.map((batch) => ({
    containers: batch.containers,
    eta: batch.eta,
    status: batch.status,
    etd: batch.etd,
    isActive: batch.isActive,
  }));

  console.log(mappedData);
  return mappedData;
};

// export const mapContractData = (contractData) => {
//   const mappedData = {
//     date: contractData.date,
//     quantity: parseFloat(contractData.quantity),
//     price: parseFloat(contractData.price),
//     payment: contractData.payment,
//     incoterm: contractData.incoterm,
//     etd: contractData.etd,
//     eta: contractData.eta,
//     notes: contractData.notes,
//     companyBuyerId: contractData.companyBuyer,
//     companySellerId: contractData.companySeller,
//     isActive: true,
//   };

//   // Mapeo de containers, transformándolos a la estructura esperada por el backend
//   mappedData.containers = contractData.containers?.map((container) => ({
//     id: container?.id,
//     product: container?.product,
//     harvest: parseInt(container?.harvest),
//     containerType: container?.containerType,
//     fcl: container?.fcl,
//   }));

//   mappedData.shipmentBatch = {
//     ...contractData.shipmentBatch,
//   };

//   console.log(mappedData);
//   return mappedData;
// };
