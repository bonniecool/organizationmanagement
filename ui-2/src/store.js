import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import RootSaga from './sagas';
import RootReducer from './reducers';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);
  const store = createStoreWithMiddleware(RootReducer, {});
  sagaMiddleware.run(RootSaga);

  return store;
}
