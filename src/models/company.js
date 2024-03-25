import { getAllCompanies } from '../lib/services/company';

const defaultState = {
  companies: {},
};

const company = {
  state: defaultState,
  reducers: {
    set: (state, updatedSection) => ({
      ...state,
      ...updatedSection,
    }),
    'global/reset': () => defaultState,
  },
  effects: (dispatch) => ({
    getAllCompanies: async () => {
      const { error, data } = await getAllCompanies();

      if (error) {
        return { error };
      }

      const { companies } = data;

      const transformedCompanies = companies.map((company) => ({
        value: company.id,
        label: `${company.name}`,
      }));

      dispatch.company.set({
        companies: { all: companies, transformedCompanies },
      });
    },
  }),
};

export default company;
