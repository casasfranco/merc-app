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

  // Convertir las cantidades en los lotes de envío ("shipmentBatch")
  if (mappedData.shipmentBatch) {
    mappedData.shipmentBatch.forEach((batch) => {
      // Iterar sobre los contenedores de cada lote de envío
      for (const containerId in batch.containers) {
        if (
          Object.prototype.hasOwnProperty.call(batch.containers, containerId)
        ) {
          const container = batch.containers[containerId];
          // Convertir la cantidad a entero
          container.quantity = parseInt(container.quantity);
        }
      }
    });
  }
  return mappedData;
};
