import * as req from 'api/actions';
import * as c from './constants';

// eslint-disable-next-line import/prefer-default-export
export const getUserList = (params, callback) => req.list(
  c.GET_USER_LIST,
  '/mng/su/user/administrator',
  params,
  callback,
);

export const getSelectedUser = (id, callback) => req.item(
  c.GET_SELECTED_USER_BY_ID,
  `/mng/su/user/administrator/${id}`,
  callback,
);
