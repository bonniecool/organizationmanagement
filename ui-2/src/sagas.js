import { all } from 'redux-saga/effects';
import auth from 'modules/auth/saga';
import common from 'modules/common/sagas/common';
import apiSaga from './api/sagas';

export default function* rootSaga() {
  yield all([
    auth(),
    common(),
    apiSaga(),
  ]);
}
