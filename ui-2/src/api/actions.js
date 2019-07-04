import _ from 'lodash';
import store from 'store';
import alert from 'react-s-alert';
import * as c from './constants';

export const startLoading = (x, z = 'loader') => ({
  ...x,
  loading: x.loading.concat([z]),
});

export const endLoading = (x, z = 'loader') => ({
  ...x,
  loading: x.loading.filter(y => y !== z),
});


export const list = (constant, url, params, callback) => ({
  type: c.GET_LIST,
  key: constant,
  url,
  params,
  callback,
});

export const toList = constant => res => ({
  type: c.GOT_LIST,
  key: constant,
  data: _.get(res, 'response.data') || [],
  pager: _.get(res, 'response.meta') || {},
});

export const listError = constant => error => new Promise((resolve) => {
  store.dispatch({
    type: c.GOT_LIST,
    key: constant,
    data: [],
    pager: {},
  });
  resolve({
    type: 'ON_ERROR',
    key: constant,
    error,
  });
});

export const item = (constant, url, params, callback) => ({
  type: c.GET_ITEM,
  key: constant,
  url,
  params,
  callback,
});

export const toItem = constant => res => ({
  type: c.GOT_ITEM,
  key: constant,
  data: _.get(res, 'response.data') || [],
});

export const itemError = constant => error => new Promise((resolve) => {
  store.dispatch({
    type: c.GOT_ITEM,
    key: constant,
    data: {},
  });
  resolve({
    type: 'ON_ERROR',
    key: constant,
    error,
  });
});

export const create = (constant, url, payload, callback) => ({
  type: c.CREATE_ITEM,
  key: constant,
  url,
  payload,
  callback,
});

export const update = (constant, url, payload, callback) => ({
  type: c.UPDATE_ITEM,
  key: constant,
  url,
  payload,
  callback,
});

export const remove = (constant, url, payload, callback) => ({
  type: c.DELETE_ITEM,
  key: constant,
  url,
  payload,
  callback,
});

export const upload = (constant, url, formData, callback) => ({
  type: c.UPLOAD_FORM_DATA,
  key: constant,
  url,
  formData,
  callback,
});

export const download = (constant, url, fileName, callback) => ({
  type: c.DOWNLOAD,
  key: constant,
  url,
  fileName,
  callback,
});

export const withMessage = (doneConstant, default_message = 'Success!') => ({ response }) => {
  const { message, data } = response;
  alert.success(message || default_message); // eslint-disable-line
  return {
    type: c.CREATED_ITEM,
    key: doneConstant,
    data: data || {},
  };
};
