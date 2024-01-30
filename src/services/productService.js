import axios from 'axios';

const API_URL = 'tu-api-url'; // reemplaza con tu URL real

export const productService = {
  async getProducts() {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los productos', error);
    }
  },
  // Puedes agregar más métodos aquí
};
