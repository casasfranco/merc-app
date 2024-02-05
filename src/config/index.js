const urls = {
  user: {
    login: '/login',
  },
  product: {
    create: '/product',
    getAll: '/products',
  },
  packing: {
    create: '/packing',
    getAll: '/packings',
  },
  productPackingRelation: {
    create: '/productPacking',
    getAll: '/productPackings',
  },
};

const config = {
  api: {
    baseUrl: process.env.REACT_APP_API_BASEURL,
  },
  files: {
    maxNumber: 10,
    videoSize: 500,
    otherSize: 10,
  },
  urls,
};

export default config;
