import { useSelector, useDispatch } from 'react-redux';

function createModelHook(key) {
  let model = () => useSelector((state) => state[key]);
  model.dispatch = () => useDispatch()[key];
  return model;
}

const useModel = {
  fnol: createModelHook('fnol'),
  product: createModelHook('product'),
  session: createModelHook('session'),
  user: createModelHook('user'),
  updated: createModelHook('updated'),
};

export default useModel;
