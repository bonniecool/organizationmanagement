import * as req from 'api/actions';
import * as c from './constants';

// eslint-disable-next-line import/prefer-default-export
export const getList = (params, callback) => req.list(
  c.GET_LIST,
  '/mng/payment',
  params,
  callback,
);

export const getDetails = (id, callback) => req.item(
  c.GET_DETAILS,
  `/mng/organization/${id}`,
  callback,
);
