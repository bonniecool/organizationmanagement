import axios from 'axios';
import { sessionId } from 'session';
import { call, race, put as sagaPut } from 'redux-saga/effects';
import { delay } from 'helper';
import uuid from 'uuid/v4';
import _ from 'lodash';
import { loading } from 'modules/common/action';

const getFirstErrorMessage = (data) => {
  let message = '';
  const errors = _.get(data, 'data.errors', {});
  const keys = Object.keys(errors);
  for (let index = 0; index < keys.length; index += 1) {
    message = errors[keys[index]][0]; // eslint-disable-line
    break;
  }
  return message;
};

const REQUEST_TIMEOUT = 5000;

const instance = axios.create({
  timeout: 30000,
  baseURL: process.env.REACT_APP_END_POINT,
  headers: {
    'Content-Type': 'application/json',
  },
  // transformRequest: transform,
});

const getAuthDetails = () => {
  try {
    const session = sessionId();
    if (session && session.auth_code) {
      return session.auth_code;
    }
    return null;
  } catch (error) {
    console.log(error); // eslint-disable-line
    return null;
  }
};

const post = uri => (args) => {
  const authCode = getAuthDetails();
  if (authCode) {
    instance.defaults.headers.common.Authorization = `Bearer ${authCode}`;
  }

  return instance
    .post(uri, args)
    .then(response => response)
    .catch(error => error.response);
};

const get = uri => (params) => {
  const authCode = getAuthDetails();
  if (authCode) {
    instance.defaults.headers.common.Authorization = `Bearer ${authCode}`;
  }

  return instance
    .get(uri, {
      params,
    })
    .then(response => response)
    .catch(error => error.response);
};

const put = uri => (params) => {
  const authCode = getAuthDetails();
  if (authCode) {
    instance.defaults.headers.common.Authorization = `Bearer ${authCode}`;
  }

  return instance
    .put(uri, params)
    .then(response => response)
    .catch(error => error.response);
};

const patch = uri => (params) => {
  const authCode = getAuthDetails();
  if (authCode) {
    instance.defaults.headers.common.Authorization = `Bearer ${authCode}`;
  }

  return instance
    .patch(uri, params)
    .then(response => response)
    .catch(error => error.response);
};

const remove = uri => () => {
  const authCode = getAuthDetails();
  if (authCode) {
    instance.defaults.headers.common.Authorization = `Bearer ${authCode}`;
  }

  return instance
    .delete(uri)
    .then(response => response)
    .catch(error => error.response);
};

function* handleRequest(request, args, loadId) {
  const id = loadId || uuid();
  yield sagaPut(loading(id));
  const { response, timeout } = yield race({
    response: call(request, args),
    timeout: delay(REQUEST_TIMEOUT),
  });

  if (timeout) {
    yield sagaPut({
      type: 'REQUEST_TIMEOUT',
    });
    yield sagaPut(loading(id, false));
    return null;
  }

  const status = _.get(response, 'status');
  if (status >= 400 || !status) {
    if (status === 403 && (response.data.message === 'Token Expired' || response.data.message === 'Invalid token.')) {
      // yield sagaPut({
      //   type: 'AUTH/LOGOUT',
      // });
    }

    if (status === 403 && response.data.message === 'Invalid login') {
      yield sagaPut({
        type: 'REQUEST_ERROR',
        error: getFirstErrorMessage(response) || _.get(response, 'data.message', 'Error'),
      });
    }

    if (status) {
      const error = status === 422 ? getFirstErrorMessage(response) : _.get(response, 'data.message', 'Error');
      yield sagaPut({
        type: 'REQUEST_ERROR',
        error,
      });
    }

    yield sagaPut(loading(id, false));
    return null;
  }

  yield sagaPut(loading(id, false));
  return _.get(response, 'data') || {};
}

export {
  instance, post, get, put, patch, remove, handleRequest,
};
