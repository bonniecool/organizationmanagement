import { sleep, getFirstMessage } from 'helper';
import * as services from 'services';
import alert from 'react-s-alert';
import { history } from 'index';
import { put, call } from 'redux-saga/effects';
import _ from 'lodash';
import { loading, apiError } from './modules/common/action';

// eslint-disable-next-line
function* watchApiReponse(response = {}, responseOk = function* () { }, responseNotOkay) {
  if (response.status === 200) {
    yield call(responseOk);
  }

  if (response.status === 201) {
    yield call(responseOk);
  }

  if (response.status === 422) {
    alert.error(getFirstMessage(response.data.errors));
    if (responseNotOkay) yield call(responseNotOkay);
  }

  if (response.status === 403) {
    alert.error(_.get(response, 'data.message') || 'Invalid token');
    yield put({
      type: 'AUTH/LOGOUT',
    });
  }

  if (response.status === 403 && (response.data.message === 'Token expired.' || response.data.message === 'Invalid token.' || response.data.message === 'Invalid Device.')) {
    alert.error('Session Expired');
    yield put({
      type: 'AUTH/LOGOUT',
    });
  }

  if (response.status === 500) {
    alert.error('Oops! Something went wrong. Please contact web admin');
  }

  if (response.status === 400) {
    alert.error(response.data.message || getFirstMessage(response.data.errors || { error: 'Oops...Something went wrong' }));
    if (responseNotOkay) yield call(responseNotOkay);
  }

  if (response.status === 404) {
    if (responseNotOkay) yield call(responseNotOkay);
  }

  if (response.status === 429) {
    alert.error('Too many request. Try again later.');
  }
}

// eslint-disable-next-line arrow-body-style
const asyncApiResponse = (response) => {
  return new Promise(async (responseOk, responseNotOkay) => {
    if (response.status === 200) {
      responseOk(response.data);
    }

    if (response.status === 201) {
      responseOk(response.data);
    }

    if (response.status === 422) {
      alert.error(getFirstMessage(response.data.errors));
    }

    if (response.status === 403) {
      alert.error('Invalid Token');
    }

    if (response.status === 403 && (response.data.message === 'Token expired.' || response.data.message === 'Invalid token.')) {
      alert.error('Session Expired');
    }

    if (response.status === 500) {
      alert.error('Oops! Something went wrong. Please contact web admin');
    }

    if (response.status === 400) {
      alert.error(response.data.message || getFirstMessage(response.data.errors || { error: 'Oops...Something went wrong' }));
      if (responseNotOkay) responseNotOkay(response.data);
    }

    if (response.status === 404) {
      if (responseNotOkay) responseNotOkay(response.data);
    }

    if (response.status === 429) {
      alert.error('Too many request. Try again later.');
    }
  });
};

const matchRedirect = (param, value, props) => {
  const { match } = props;
  let url = match.path;
  _.forOwn(match.params, (val, key) => {
    url = url.replace(`:${key}?`, key === param ? value : val);
    url = url.replace(`:${key}`, key === param ? value : val);
  });
  history.push(url);
};

const pathRedirect = (index, value, props) => {
  const { location } = props;
  const { pathname } = location;
  // eslint-disable-next-line prefer-const
  let arr = pathname.split('/');
  arr[index] = `${value}`;
  history.push(arr.join('/'));
};

const loadExternalAPI = (doc, type, id, src, onLoad) => {
  var js; var fjs = doc.getElementsByTagName(type)[0];
  if (doc.getElementById(id)) {
    onLoad();
    return;
  }
  js = doc.createElement(type);
  js.id = id;
  js.src = src;
  js.onload = onLoad;
  fjs.parentNode.insertBefore(js, fjs);
};

export {
  loading,
  sleep,
  alert,
  history,
  services,
  apiError,
  watchApiReponse,
  _,
  matchRedirect,
  pathRedirect,
  loadExternalAPI,
  asyncApiResponse,
};