/* eslint-disable func-names */
import {
  takeEvery, put, call, all,
} from 'redux-saga/effects';
import { watchApiReponse, services, alert } from 'utils';
import { deepCleanObjForNull } from 'helper';
import * as c from './constants';

function* getList({
  key,
  url,
  params,
  callback,
}) {
  const response = yield call(services.get(url), params);
  yield call(watchApiReponse, response, function* () {
    const { data, meta } = response.data;
    yield put({
      type: c.GOT_LIST,
      key,
      data,
      pager: meta,
    });
    if (callback) {
      callback({ data, pager: meta });
    }
  }, function* () {
    yield put({
      type: c.GOT_LIST,
      key,
      data: [],
      pager: {},
    });
    yield put({
      type: 'ON_ERROR',
      error: {},
      key,
    });
  });
}

function* getItem({
  key, url, params, callback,
}) {
  const response = yield call(services.get(url), params);
  yield call(watchApiReponse, response, function* () {
    const { data } = response.data;
    yield put({
      type: c.GOT_ITEM,
      key,
      data,
    });
    if (callback) {
      callback({ data });
    }
  }, function* () {
    yield put({
      type: c.GOT_ITEM,
      key,
      data: {},
    });
    yield put({
      type: 'ON_ERROR',
      error: {},
      key,
    });
  });
}

function* createItem({
  key, url, payload, callback,
}) {
  const response = yield call(services.post(url), deepCleanObjForNull(payload));
  yield call(watchApiReponse, response, function* () {
    const { data, message } = response.data;
    alert.success(message || 'Created!');
    if (callback) {
      callback(data);
    }
    yield put({ type: c.CREATED_ITEM, key });
  }, function* () {
    yield put({
      type: 'ON_ERROR',
      error: {},
      key,
    });
  });
}

function* updateItem({
  key, url, payload, callback,
}) {
  const response = yield call(services.put(url), deepCleanObjForNull(payload));
  yield call(watchApiReponse, response, function* () {
    const { data, message } = response.data;
    alert.success(message || 'Updated!');
    if (callback) {
      callback(data);
    }
    yield put({ type: c.UPDATED_ITEM, key });
  }, function* () {
    yield put({
      type: 'ON_ERROR',
      error: {},
      key,
    });
  });
}

function* deleteItem({
  key, url, payload, callback,
}) {
  const response = yield call(services.remove(url), deepCleanObjForNull(payload));
  yield call(watchApiReponse, response, function* () {
    const { data, message } = response.data;
    alert.success(message || 'Removed!');
    if (callback) {
      callback(data);
    }
    yield put({ type: c.DELETED_ITEM, key });
  }, function* () {
    yield put({
      type: 'ON_ERROR',
      error: {},
      key,
    });
  });
}

export default function* apiSaga() {
  yield all([
    takeEvery(c.GET_LIST, getList),
    takeEvery(c.GET_ITEM, getItem),
    takeEvery(c.CREATE_ITEM, createItem),
    takeEvery(c.UPDATE_ITEM, updateItem),
    takeEvery(c.DELETE_ITEM, deleteItem),
  ]);
}
