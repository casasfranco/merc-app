import config from '../config';
import { packingQueries } from '../graphql/packing';
import { productQueries } from '../graphql/product';
import { api } from '../lib/hooks/useApi/useApi';

const {
  urls: { packing: packingUrl, product: productUrl },
} = config;

const { GET_ALL_PACKINGS } = packingQueries;
const { GET_ALL_PRODUCTS } = productQueries;

const defaultState = {
  products: {},
  packings: {},
};

const product = {
  state: defaultState,
  reducers: {
    set: (state, updatedSection) => ({
      ...state,
      ...updatedSection,
    }),
    'global/reset': () => defaultState,
  },
  effects: (dispatch) => ({
    create: async (details) => {
      const { data } = await api.secure.post('/FNOL', details);
      dispatch.fnol.set({ ...details, ...data });
    },
    verifyPolicy: async (details) => {
      const { data } = await api.post('/FNOL', details);
      dispatch.fnol.set(data);
    },
    update: async (
      { updates, page, pageIndex, waitForUpdate = true },
      root
    ) => {
      const { fnolId, causeOfLoss, typeOfLoss } = root.fnol;
      const { furthestIndex, skipList } = root.session;

      const isDisclosureAcknowledged =
        root.fnol.isDisclosureAcknowledged ??
        root.session.pendingChanges.isDisclosureAcknowledged;

      const session = { page, pageIndex };
      const body = {
        causeOfLoss,
        typeOfLoss,
        ...updates,
        resumeFrom: page,
        skipList,
        isDisclosureAcknowledged,
      };

      if (furthestIndex < pageIndex) {
        body.furthestReached = page;
        session.furthestIndex = pageIndex;
      } else if (furthestIndex >= pageIndex) {
        body.furthestReached = root.fnol.furthestReached;
      }

      if (!waitForUpdate) {
        dispatch.session.setSession(session);
      }

      const { data } = await api.secure.patch(`/FNOL/${fnolId}`, body);

      if (!!body.causeOfLoss && body.causeOfLoss !== root.fnol.causeOfLoss) {
        data.damages = null;
      }

      dispatch.fnol.set(data);
      if (waitForUpdate) {
        dispatch.session.setSession(session);
      }
    },
    getAllProducts: async () => {
      const { data } = await api.secure.post(
        productUrl.getAll,
        GET_ALL_PRODUCTS
      );

      dispatch.product.set({
        products: { all: data.products },
      });
    },
    getAllPackings: async () => {
      const { data } = await api.secure.post(
        packingUrl.getAll,
        GET_ALL_PACKINGS
      );
      const transformedPackings = data.packings.map((packing) => ({
        id: packing.id,
        title: `${packing.description} - ${packing.unit}`,
      }));
      transformedPackings.unshift({ id: 'new', title: 'Crear nuevo empaque' });

      dispatch.product.set({
        packings: { all: data.packings, transformedPackings },
      });
    },
  }),
};

export default product;
