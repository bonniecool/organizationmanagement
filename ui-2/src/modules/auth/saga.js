import {
  takeLatest,
  takeEvery,
  put,
  all,
  call,
} from 'redux-saga/effects';
import {
  handleRequest,
  post,
  get,
} from 'services';
import _ from 'lodash';
import alert from 'react-s-alert';
import { history } from 'index';
import * as c from './constant';
import { authInitState } from './reducer';

function* checkAuth({ profileType, onSuccess }) {
  let url = '';
  if (profileType === 'BranchAdministrator') {
    url = 'mng/brc/my/profile';
  } else {
    url = '/mng/my/profile';
  }

  const res = yield call(handleRequest, get(url), {}, 'GET_AUTH');

  // if (!res) {
  //   sessionStorage.removeItem('token');
  //   return true;
  // }

  if (res) {
    const { data } = res;

    sessionStorage.setItem('profile_type', _.get(data, 'profile_type'));
    sessionStorage.setItem('profile', JSON.stringify(_.get(data, 'profile')));


    yield put({
      type: c.GOT_AUTH,
      data: {
        isAuthenticated: true,
        profile: _.get(data, 'profile'),
        profileType: _.get(data, 'profile_type'),
      },
    });

    if (onSuccess) {
      yield call(onSuccess, true);
    }
  }
  return true;
}

function* login({ args }) {
  const url = 'mng/auth';
  const res = yield call(handleRequest, post(url), args, 'LOGIN');
  if (!res) return;
  const token = _.get(res, 'data.token');
  const profileType = _.get(res, 'data.profile_type');
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('profile_type', profileType);

  yield checkAuth({ profileType, onSuccess: () => {} });
  history.push('/');
  // if (callback) {
  //   yield callback(true);
  // }
}

function* register({ args, callback }) {
  const url = '/register';
  const res = yield call(handleRequest, post(url), args, 'REGISTER');

  if (res) {
    const { message } = res;
    alert.success(message);

    if (callback) {
      yield callback();
    }
  }
}

function* logout() {
  localStorage.clear();
  sessionStorage.clear();

  yield put({
    type: c.GOT_AUTH,
    data: authInitState,
  });
  history.push('/');
}

export default function* Saga() {
  yield all([
    takeLatest(c.LOGIN, login),
    takeEvery(c.GET_AUTH, checkAuth),
    takeLatest(c.LOGOUT, logout),
    takeLatest(c.REGISTER, register),
  ]);
}
