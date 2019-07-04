import {
  takeLatest,
  all,
  call,
  put,
} from 'redux-saga/effects';
import { delay } from 'helper';
import {
  handleRequest,
  get,
} from 'services';
import alert from 'react-s-alert';

function* requestTimeout() {
  yield delay(200);
  alert.error('Request Timeout. Please try again later.');
}

function* requestError({ error }) {
  yield delay(200);
  if (!error) return;
  alert.error(error);
}

function* getNationalities() {
  const url = 'common/nationalities';
  const res = yield call(handleRequest, get(url), {}, 'GET_NATIONALITIES');

  if (res) {
    const { data } = res;
    yield put({
      type: 'GOT_NATIONALITIES',
      data,
    });
  }
}

export default function* Saga() {
  yield all([
    takeLatest('REQUEST_TIMEOUT', requestTimeout),
    takeLatest('REQUEST_ERROR', requestError),
    takeLatest('GET_NATIONALITIES', getNationalities),
  ]);
}
