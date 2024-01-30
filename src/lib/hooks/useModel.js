import { useSelector, useDispatch } from 'react-redux';

function createModelHook(key) {
  let model = () => useSelector((state) => state[key]);
  model.dispatch = () => useDispatch()[key];
  return model;
}

const useModel = {
  fnol: createModelHook('fnol'),
  session: createModelHook('session'),
  user: createModelHook('user'),
  updated: createModelHook('updated'),
};

useModel.fnol.defaults = (options = {}) => {
  const existingFnol = useModel.fnol();
  const { pageIndex, furthestIndex } = useModel.session();

  const isHistorical = pageIndex < furthestIndex;
  return isHistorical || options?.forceDefaults ? existingFnol : {};
};

export default useModel;
