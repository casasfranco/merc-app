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
