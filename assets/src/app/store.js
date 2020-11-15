import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import defaultReducer from './reducers';
import { registerWithMiddleware } from './sagas';

export const generateStore = (customReducers = {}) => {
  const reducer = {
    ...defaultReducer,
    ...customReducers,
  };

  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer,
    middleware: [sagaMiddleware, ...getDefaultMiddleware({ thunk: false })],
  });

  registerWithMiddleware(sagaMiddleware);

  return store;
}

export const store = generateStore();
export default store;
