import { createContract } from '../lib/services/contract';

const defaultState = {
  contracts: {},
};

const contract = {
  state: defaultState,
  reducers: {
    set: (state, updatedSection) => ({
      ...state,
      ...updatedSection,
    }),
    'global/reset': () => defaultState,
  },
  effects: () =>
    // dispatch
    ({
      create: async (formData) => {
        const { error, data } = await createContract(formData);
        if (error) {
          return { error };
        }

        console.log({ data });

        // dispatch.company.set({
        //   companies: {},
        // });
        // dispatch.fnol.set({ ...formData, ...data });
      },
    }),
};

export default contract;
