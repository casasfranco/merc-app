import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productModel);

  useEffect(() => {
    dispatch.productModel.fetchProducts();
  }, [dispatch]);

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
