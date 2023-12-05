import { configureStore } from '@reduxjs/toolkit';

import { reducers } from './reducers';

export * from './reducers';

const store = configureStore({ reducer: reducers });

export default store;
