import * as req from 'api/actions';
import * as c from './constants';

// eslint-disable-next-line import/prefer-default-export
// export const getList = (params, callback) => req.list(
//   c.GET_LIST,
//   '/mng/payment',
//   params,
//   callback,
// );

// eslint-disable-next-line import/prefer-default-export
export const getDetails = (params, callback) => req.item(
  c.GET_DETAILS,
  '/mng/my/profile',
  params,
  callback,
);
