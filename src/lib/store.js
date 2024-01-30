import { init } from '@rematch/core';
import persistPlugin from '@rematch/persist';
import updatedPlugin from '@rematch/updated';
import storage from 'redux-persist/lib/storage/session';

import * as models from '../models';
import config from '../config';

const store = init({
  models,
  plugins: [
    persistPlugin({ key: 'root', storage, blacklist: ['user'] }),
    updatedPlugin(),
  ],
  redux: {
    devtoolOptions: {
      disabled: config.debug !== 'true',
    },
  },
});

export default store;
