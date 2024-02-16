import { api } from '../lib/hooks/useApi/useApi';
import { getAllPackings, getAllProducts } from '../lib/services/product';

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
      const { error, data } = await getAllProducts();

      if (error) {
        return { error };
      }

      const { products } = data;

      const transformedProducts = products.map((product) => ({
        value: product.id,
        label: `${product.description}`,
      }));

      dispatch.product.set({
        products: { all: products, transformedProducts },
      });
    },
    getAllPackings: async () => {
      const { error, data } = await getAllPackings();

      if (error) {
        return { error };
      }

      const { packings } = data;

      const transformedPackings = packings.map((packing) => ({
        value: packing.id,
        label: `${packing.description} - ${packing.unit}`,
      }));
      // transformedPackings.unshift({
      //   id: 'new',
      //   title: 'Crear nuevo empaque',
      // });

      dispatch.product.set({
        packings: { all: packings, transformedPackings },
      });
    },
  }),
};

export default product;
